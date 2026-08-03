const express = require('express');
const db = require('../database');
const { AUTO_CLICKER, AUTO_FISHERS, RODS, REELS, LINES, BAITS } = require('../data/constants');
const { authenticate } = require('../utils');

const router = express.Router();

router.post('/buy_auto', authenticate, async (req, res) => {
  const { name, type } = req.body;
  const isClicker = type === 'auto_clicker';
  const itemData = isClicker ? AUTO_CLICKER[name] : AUTO_FISHERS[name];
  const itemTypeDb = isClicker ? 'auto_clicker' : 'auto_fisher';

  if (!itemData) return res.status(400).json({ error: 'Item not found' });

  try {
    await db.query('BEGIN');
    const inv = await db.get('SELECT quantity FROM inventory WHERE user_id = $1 AND item_name = $2', [req.user.id, name]);
    const qty = inv ? inv.quantity : 0;
    const maxQty = req.user.has_ameliorateur ? 7 : 5;

    if (qty >= maxQty) {
      await db.query('ROLLBACK');
      return res.status(400).json({ error: `Limite atteinte (${maxQty} max).` });
    }

    const cost = Math.floor(itemData.baseCost * Math.pow(1.15, qty));
    if (req.user.silver < cost) {
      await db.query('ROLLBACK');
      return res.status(400).json({ error: 'Not enough Silver' });
    }

    await db.query('UPDATE users SET silver = silver - $1, total_silver_spent = total_silver_spent + $1 WHERE id = $2', [cost, req.user.id]);
    const updatedUser = await db.get('SELECT silver FROM users WHERE id = $1', [req.user.id]);

    if (qty === 0) {
      await db.query('INSERT INTO inventory (user_id, item_type, item_name, quantity) VALUES ($1, $2, $3, 1)', [req.user.id, itemTypeDb, name]);
    } else {
      await db.query('UPDATE inventory SET quantity = quantity + 1 WHERE user_id = $1 AND item_name = $2', [req.user.id, name]);
    }

    await db.query('COMMIT');
    res.json({ success: true, newSilver: updatedUser.silver });
  } catch (err) {
    try { await db.query('ROLLBACK'); } catch(e) {}
    res.status(500).json({ error: 'Purchase failed' });
  }
});

router.post('/buy', authenticate, async (req, res) => {
  const { type, name } = req.body;
  let cost = 0;
  let itemDef = null;

  if (type === 'rod' && RODS[name]) { itemDef = RODS[name]; cost = itemDef.cost; }
  else if (type === 'reel' && REELS[name]) { itemDef = REELS[name]; cost = itemDef.cost; }
  else if (type === 'line' && LINES[name]) { itemDef = LINES[name]; cost = itemDef.cost; }
  else if (type === 'bait' && BAITS[name]) { itemDef = BAITS[name]; cost = itemDef.cost; }
  else return res.status(400).json({ error: 'Invalid item type or name' });

  if (itemDef && itemDef.levelRequired && req.user.level < itemDef.levelRequired) {
    return res.status(400).json({ error: `Vous devez debloquer la map : ${itemDef.mapName} (Niveau ${itemDef.levelRequired}) pour acheter cet objet.` });
  }

  if (req.user.silver < cost) {
    return res.status(400).json({ error: 'Pas assez de Silver !' });
  }

  try {
    await db.query('BEGIN');
    await db.query(
      `INSERT INTO inventory (user_id, item_type, item_name, quantity) 
       VALUES ($1, $2, $3, 1)
       ON CONFLICT(user_id, item_type, item_name) 
       DO UPDATE SET quantity = inventory.quantity + 1`,
      [req.user.id, type, name]
    );

    await db.query('UPDATE users SET silver = silver - $1 WHERE id = $2', [cost, req.user.id]);
    const updated = await db.get('SELECT silver FROM users WHERE id = $1', [req.user.id]);
    await db.query('COMMIT');

    res.json({ success: true, newSilver: updated.silver });
  } catch (err) {
    try { await db.query('ROLLBACK'); } catch(e) {}
    res.status(500).json({ error: 'Purchase failed' });
  }
});

router.post('/p2w', authenticate, async (req, res) => {
  const { pack } = req.body;
  
  try {
    await db.query('BEGIN');
    let message = '';
    
    if (pack === 'silver') {
      await db.query('UPDATE users SET silver = silver + 1000, total_capital = total_capital + 1000 WHERE id = $1', [req.user.id]);
      message = 'Le Pack Argent activé ! +1000 Silver.';
    }
    else if (pack === 'voyageur') {
      await db.query('UPDATE users SET has_voyageur = TRUE WHERE id = $1', [req.user.id]);
      message = 'Le Voyageur activé ! Voyages gratuits débloqués.';
    }
    else if (pack === 'ameliorateur') {
      await db.query('UPDATE users SET has_ameliorateur = TRUE WHERE id = $1', [req.user.id]);
      message = 'L\'Améliorateur activé ! Limite d\'achat augmentée à 7.';
    }
    else if (pack === 'offline') {
      await db.query('UPDATE users SET has_offline = TRUE WHERE id = $1', [req.user.id]);
      message = 'L\'Offline activé ! Gains hors-ligne activés (50% pendant 1h max).';
    } else {
      await db.query('ROLLBACK');
      return res.status(400).json({ error: 'Pack Premium inconnu' });
    }

    const updated = await db.get('SELECT silver FROM users WHERE id = $1', [req.user.id]);
    await db.query('COMMIT');

    return res.json({ success: true, message, newSilver: updated.silver });
  } catch (err) {
    res.status(500).json({ error: 'P2W failed' });
  }
});

router.post('/repair', authenticate, async (req, res) => {
  const { type, name } = req.body;
  if (!['rod', 'reel'].includes(type)) return res.status(400).json({ error: 'Matériel non réparable' });

  const itemDef = type === 'rod' ? RODS[name] : REELS[name];
  if (!itemDef) return res.status(400).json({ error: 'Objet inconnu' });

  const currentDurability = type === 'rod' ? (req.user.current_rod_durability || 100) : (req.user.current_reel_durability || 100);
  if (currentDurability >= 100) return res.status(400).json({ error: 'Matériel déjà en parfait état !' });

  const missingPercent = (100 - currentDurability) / 100.0;
  // Formula requested by user: Cost = (Base Cost) * (Missing Durability %) * 1.5
  const repairCost = Math.max(1, Math.floor(itemDef.cost * missingPercent * 1.5));

  if (req.user.silver < repairCost) {
    return res.status(400).json({ error: `Pas assez de Silver ! (${repairCost} Silver requis)` });
  }

  try {
    await db.query('BEGIN');
    await db.query('UPDATE users SET silver = silver - $1 WHERE id = $2', [repairCost, req.user.id]);
    
    if (type === 'rod') {
      await db.query('UPDATE users SET current_rod_durability = 100.0 WHERE id = $1', [req.user.id]);
    } else {
      await db.query('UPDATE users SET current_reel_durability = 100.0 WHERE id = $1', [req.user.id]);
    }

    const updated = await db.get('SELECT silver FROM users WHERE id = $1', [req.user.id]);
    await db.query('COMMIT');

    res.json({ success: true, message: `${name} réparé à 100% !`, newSilver: updated.silver, repairCost });
  } catch (err) {
    try { await db.query('ROLLBACK'); } catch(e) {}
    res.status(500).json({ error: 'Erreur lors de la réparation' });
  }
});

router.post('/coffee', authenticate, async (req, res) => {
  const { type } = req.body;
  let cost = 0;
  let restoreAmount = 0;

  if (type === 'cup') {
    cost = 15;
    restoreAmount = 30.0;
  } else if (type === 'thermos') {
    cost = 45;
    restoreAmount = 100.0;
  } else {
    return res.status(400).json({ error: 'Type de café inconnu' });
  }

  if (req.user.silver < cost) {
    return res.status(400).json({ error: `Pas assez de Silver ! (${cost} Silver requis)` });
  }

  const currentEnergy = req.user.energy !== undefined ? req.user.energy : 100.0;
  if (currentEnergy >= 100.0) {
    return res.status(400).json({ error: 'Votre énergie est déjà au maximum !' });
  }

  try {
    await db.query('BEGIN');
    const newEnergy = Math.min(100.0, Number((currentEnergy + restoreAmount).toFixed(1)));
    await db.query('UPDATE users SET silver = silver - $1, energy = $2 WHERE id = $3', [cost, newEnergy, req.user.id]);
    const updated = await db.get('SELECT silver, energy FROM users WHERE id = $1', [req.user.id]);
    await db.query('COMMIT');

    res.json({ success: true, message: `Café consommé ! Énergie: ${updated.energy}%`, newSilver: updated.silver, newEnergy: updated.energy });
  } catch (err) {
    try { await db.query('ROLLBACK'); } catch(e) {}
    res.status(500).json({ error: 'Échec achat café' });
  }
});

module.exports = router;

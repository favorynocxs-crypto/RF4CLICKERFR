const express = require('express');
const db = require('../database');
const { WATER_BODIES, FISH_DATABASE } = require('../data/constants');
const { generateFishToken, verifyFishToken, calculateLevel, getUserStats, authenticate } = require('../utils');

const router = express.Router();

router.post('/bite', authenticate, async (req, res) => {
  try {
    const map = req.user.current_water_body;
    const wb = WATER_BODIES[map] || WATER_BODIES['Lac aux moustique'];
    const activeStyle = req.user.current_style || 'fond';

    if (!wb.styles.includes(activeStyle)) {
      return res.status(400).json({ error: `La technique ${activeStyle} n'est pas autorisée sur ce plan d'eau.` });
    }

    const speciesList = FISH_DATABASE[map] || FISH_DATABASE['Lac aux moustique'];
    
    let totalRate = 0;
    speciesList.forEach(s => totalRate += s.rate);
    let speciesRoll = Math.random() * totalRate;
    let species = speciesList[0];
    for (let s of speciesList) {
      if (speciesRoll < s.rate) {
        species = s;
        break;
      }
      speciesRoll -= s.rate;
    }
    
    let weight = Number((species.minW + Math.random() * (species.maxW - species.minW)).toFixed(3));
    
    let rarity = 'Tagué';
    let valMult = 1.0;
    let xpMult = 1.0;
    let baseClicks = 10;
    
    // Trophies are rare achievements (Blue Trophy: 0.05% = 0.0005, Trophy: 2% = 0.02)
    const trophyRoll = Math.random();
    if (trophyRoll < 0.0005) {
      rarity = 'Trophée Bleu';
      weight = Number((species.blueTrophyW + Math.random() * (species.maxW - species.blueTrophyW)).toFixed(3));
      valMult = 5.0;
      xpMult = 5.0;
      baseClicks = 60;
    } else if (trophyRoll < 0.0205) {
      rarity = 'Trophée';
      weight = Number((species.trophyW + Math.random() * (species.blueTrophyW - species.trophyW)).toFixed(3));
      valMult = 2.5;
      xpMult = 2.5;
      baseClicks = 25;
    } else {
      // Normal fish (80% Tagué, 20% Non-Tagué)
      weight = Number((species.minW + Math.random() * (species.trophyW - species.minW)).toFixed(3));
      if (Math.random() < 0.20) {
        rarity = 'Non-Tagué';
        valMult = 0.4;
        xpMult = 0.4;
        baseClicks = 5;
      }
    }

    if (species.rate <= 0.05) {
      rarity += ' (Espèce Rare)';
      valMult *= 2.0;
      xpMult *= 2.0;
    }

    const xpPerKg = species.xpPerKg || 12;
    const silverValue = Number(((weight * species.valuePerKg * valMult) / 2.0).toFixed(2));
    const xpValue = Math.floor(weight * xpPerKg * xpMult);

    let mapHPFactor = 1.8;
    if (map === 'Rivière Belaya') mapHPFactor = 6.5;
    else if (map === 'Lac cuivré') mapHPFactor = 32.0;
    else if (map === 'Mer de Norvège') mapHPFactor = 260.0;

    const hpExp = Math.pow(weight, 1.2); 
    const clicksRequired = Math.max(5, Math.floor((baseClicks + (hpExp * 2.5)) * mapHPFactor));

    // Combat time calculated at ~20% of clicksRequired (min 8s, max 600s) requiring 5 CPS minimum
    const combatTime = Math.min(600, Math.max(8, Math.floor(clicksRequired * 0.2)));
    const startTime = Date.now();

    const formattedName = `${species.name} (${rarity})`;
    const token = generateFishToken({
      userId: req.user.id,
      fishName: formattedName,
      weight,
      rarity,
      silverValue,
      xpValue,
      clicksRequired,
      startTime
    });

    res.json({
      token,
      fishName: formattedName,
      weight,
      rarity,
      clicksRequired,
      combatTime
    });
  } catch (err) {
    res.status(500).json({ error: 'Bite generator failed' });
  }
});

router.post('/land', authenticate, async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Missing fish token' });

  const data = verifyFishToken(token);
  if (!data || data.userId !== req.user.id) {
    return res.status(400).json({ error: 'Invalid or expired fish token' });
  }

  try {
    // Removed strict time-based ban check to avoid false positives

    await db.query('BEGIN');
    
    await db.query(
      'INSERT INTO catches (user_id, fish_name, weight, silver_value, xp_value, sold) VALUES ($1, $2, $3, $4, $5, FALSE)',
      [req.user.id, data.fishName, data.weight, data.silverValue, data.xpValue]
    );

    let wear = data.weight * 0.05;
    if (data.rarity.includes('Trophée')) wear *= 2;
    if (data.rarity.includes('Trophée Bleu')) wear *= 5;
    wear = Number(wear.toFixed(2));

    const newXP = req.user.xp + data.xpValue;
    const newLevel = calculateLevel(newXP);
    const leveledUp = newLevel > req.user.level;

    await db.query(
      'UPDATE users SET xp = $1, level = $2, total_catches = total_catches + 1, total_clicks = total_clicks + $3, last_active = CURRENT_TIMESTAMP, current_rod_durability = GREATEST(0.0, current_rod_durability - $4), current_reel_durability = GREATEST(0.0, current_reel_durability - $4) WHERE id = $5',
      [newXP, newLevel, Math.ceil(data.clicksRequired), wear, req.user.id]
    );
    
    await db.query('COMMIT');

    res.json({
      success: true,
      fishName: data.fishName,
      weight: data.weight,
      xpGained: data.xpValue,
      newXP,
      newLevel,
      levelUp: leveledUp ? newLevel : null
    });
  } catch (err) {
    try { await db.query('ROLLBACK'); } catch(e) {}
    res.status(500).json({ error: 'Failed to land fish' });
  }
});

router.post('/sell', authenticate, async (req, res) => {
  try {
    const summary = await db.get(
      'SELECT COUNT(*) as count, COALESCE(SUM(silver_value), 0) as total FROM catches WHERE user_id = $1 AND sold = FALSE',
      [req.user.id]
    );

    const count = parseInt(summary.count) || 0;
    const totalSilver = Number(parseFloat(summary.total).toFixed(2));

    if (count === 0) {
      return res.status(400).json({ error: 'Vivier vide ou tous les poissons sont déjà vendus !' });
    }

    await db.query('BEGIN');
    await db.query('UPDATE catches SET sold = TRUE WHERE user_id = $1 AND sold = FALSE', [req.user.id]);
    await db.query('UPDATE users SET silver = silver + $1, total_capital = total_capital + $1 WHERE id = $2', [totalSilver, req.user.id]);
    const updated = await db.get('SELECT silver FROM users WHERE id = $1', [req.user.id]);
    await db.query('COMMIT');

    res.json({ success: true, silverAdded: totalSilver, newTotal: updated.silver, fishSold: count });
  } catch (err) {
    try { await db.query('ROLLBACK'); } catch(e) {}
    res.status(500).json({ error: 'Failed to sell fish' });
  }
});

module.exports = router;

const FISH_DATABASE = {
  'Lac aux moustique': [
    { name: 'Carassassin', rate: 0.35, minW: 0.15, maxW: 3.2, trophyW: 1.8, blueTrophyW: 2.9, valuePerKg: 4, xpPerKg: 12 },
    { name: 'Gardon', rate: 0.30, minW: 0.1, maxW: 2.2, trophyW: 1.2, blueTrophyW: 2.0, valuePerKg: 4, xpPerKg: 10 },
    { name: 'Brème', rate: 0.20, minW: 0.8, maxW: 7.7, trophyW: 4.4, blueTrophyW: 7.0, valuePerKg: 5, xpPerKg: 15 },
    { name: 'Tanche', rate: 0.10, minW: 0.5, maxW: 6.6, trophyW: 4.0, blueTrophyW: 6.0, valuePerKg: 10, xpPerKg: 20 },
    { name: 'Tanche dorée', rate: 0.048, minW: 0.3, maxW: 6.6, trophyW: 4.0, blueTrophyW: 6.0, valuePerKg: 15, xpPerKg: 38 },
    { name: 'Midori goi', rate: 0.002, minW: 1.0, maxW: 35.2, trophyW: 25.0, blueTrophyW: 32.0, valuePerKg: 80, xpPerKg: 100 }
  ],
  'Rivière Belaya': [
    { name: 'Chevesne', rate: 0.30, minW: 0.3, maxW: 7.7, trophyW: 4.0, blueTrophyW: 7.0, valuePerKg: 8, xpPerKg: 16 },
    { name: 'Perche', rate: 0.25, minW: 0.1, maxW: 3.0, trophyW: 1.6, blueTrophyW: 2.7, valuePerKg: 6, xpPerKg: 12 },
    { name: 'Aspe', rate: 0.18, minW: 1.0, maxW: 14.3, trophyW: 8.0, blueTrophyW: 13.0, valuePerKg: 12, xpPerKg: 28 },
    { name: 'Truite brune', rate: 0.12, minW: 0.3, maxW: 5.5, trophyW: 3.0, blueTrophyW: 5.0, valuePerKg: 15, xpPerKg: 32 },
    { name: 'Ombre', rate: 0.08, minW: 0.2, maxW: 6.0, trophyW: 3.2, blueTrophyW: 5.5, valuePerKg: 15, xpPerKg: 30 },
    { name: 'Brochet', rate: 0.045, minW: 1.0, maxW: 22.0, trophyW: 12.0, blueTrophyW: 20.0, valuePerKg: 18, xpPerKg: 22 },
    { name: 'Ombre arctique', rate: 0.02, minW: 0.2, maxW: 2.75, trophyW: 2.0, blueTrophyW: 2.5, valuePerKg: 22, xpPerKg: 34 },
    { name: 'Taïmen', rate: 0.005, minW: 2.0, maxW: 88.0, trophyW: 50.0, blueTrophyW: 80.0, valuePerKg: 50, xpPerKg: 85 }
  ],
  'Lac cuivré': [
    { name: 'Carassassin', rate: 0.20, minW: 0.2, maxW: 3.2, trophyW: 1.8, blueTrophyW: 2.9, valuePerKg: 8, xpPerKg: 14 },
    { name: 'F1', rate: 0.18, minW: 1.5, maxW: 4.4, trophyW: 3.0, blueTrophyW: 4.0, valuePerKg: 15, xpPerKg: 35 },
    { name: 'Tanche', rate: 0.15, minW: 0.5, maxW: 6.6, trophyW: 4.0, blueTrophyW: 6.0, valuePerKg: 10, xpPerKg: 22 },
    { name: 'C2 Super Freak', rate: 0.12, minW: 2.5, maxW: 44.0, trophyW: 30.0, blueTrophyW: 40.0, valuePerKg: 18, xpPerKg: 65 },
    { name: 'Carpe Miroir', rate: 0.08, minW: 2.8, maxW: 44.0, trophyW: 25.0, blueTrophyW: 40.0, valuePerKg: 18, xpPerKg: 45 },
    { name: 'Carpe Cuir', rate: 0.07, minW: 3.0, maxW: 49.5, trophyW: 30.0, blueTrophyW: 45.0, valuePerKg: 18, xpPerKg: 50 },
    { name: 'Carpe Dinks Miroir', rate: 0.04, minW: 1.0, maxW: 49.5, trophyW: 35.0, blueTrophyW: 45.0, valuePerKg: 25, xpPerKg: 28 },
    { name: 'Carpe Dinks Linéaire', rate: 0.04, minW: 1.0, maxW: 49.5, trophyW: 35.0, blueTrophyW: 45.0, valuePerKg: 25, xpPerKg: 28 },
    { name: 'Carpe Dinks Cuir', rate: 0.04, minW: 1.0, maxW: 49.5, trophyW: 35.0, blueTrophyW: 45.0, valuePerKg: 25, xpPerKg: 28 },
    { name: 'Tanche Kvolsdorfsky', rate: 0.03, minW: 0.8, maxW: 6.6, trophyW: 4.0, blueTrophyW: 6.0, valuePerKg: 25, xpPerKg: 40 },
    { name: 'Orenji ogon', rate: 0.015, minW: 2.0, maxW: 38.5, trophyW: 25.0, blueTrophyW: 35.0, valuePerKg: 60, xpPerKg: 95 },
    { name: 'Kohaku', rate: 0.015, minW: 2.0, maxW: 38.5, trophyW: 25.0, blueTrophyW: 35.0, valuePerKg: 60, xpPerKg: 95 },
    { name: 'Mameshibori Goshiki', rate: 0.005, minW: 2.0, maxW: 38.5, trophyW: 25.0, blueTrophyW: 35.0, valuePerKg: 80, xpPerKg: 150 },
    { name: 'Narumi asagi', rate: 0.005, minW: 2.0, maxW: 38.5, trophyW: 25.0, blueTrophyW: 35.0, valuePerKg: 80, xpPerKg: 150 },
    { name: 'Yotsushiro', rate: 0.005, minW: 2.0, maxW: 38.5, trophyW: 25.0, blueTrophyW: 35.0, valuePerKg: 80, xpPerKg: 150 },
    { name: 'Hi utsuri', rate: 0.005, minW: 2.0, maxW: 38.5, trophyW: 25.0, blueTrophyW: 35.0, valuePerKg: 80, xpPerKg: 150 }
  ],
  'Mer de Norvège': [
    { name: 'Lieu Noir', rate: 0.20, minW: 1.0, maxW: 27.5, trophyW: 19.0, blueTrophyW: 25.0, valuePerKg: 25, xpPerKg: 55 },
    { name: 'Chaboisseau', rate: 0.15, minW: 0.1, maxW: 4.4, trophyW: 3.0, blueTrophyW: 4.0, valuePerKg: 15, xpPerKg: 35 },
    { name: 'Brosme', rate: 0.14, minW: 1.0, maxW: 26.4, trophyW: 18.0, blueTrophyW: 24.0, valuePerKg: 20, xpPerKg: 48 },
    { name: 'Maquereau', rate: 0.12, minW: 0.2, maxW: 3.08, trophyW: 2.0, blueTrophyW: 2.8, valuePerKg: 25, xpPerKg: 40 },
    { name: 'Cabillaud', rate: 0.09, minW: 2.0, maxW: 71.5, trophyW: 50.0, blueTrophyW: 65.0, valuePerKg: 35, xpPerKg: 75 },
    { name: 'Aiglefin', rate: 0.08, minW: 0.5, maxW: 14.3, trophyW: 11.0, blueTrophyW: 13.0, valuePerKg: 25, xpPerKg: 65 },
    { name: 'Petit Sébaste', rate: 0.06, minW: 0.3, maxW: 4.4, trophyW: 3.0, blueTrophyW: 4.0, valuePerKg: 35, xpPerKg: 50 },
    { name: 'Grand Sébaste', rate: 0.05, minW: 0.8, maxW: 12.1, trophyW: 9.0, blueTrophyW: 11.0, valuePerKg: 45, xpPerKg: 60 },
    { name: 'Lieu Jaune', rate: 0.0592, minW: 1.0, maxW: 15.4, trophyW: 11.0, blueTrophyW: 14.0, valuePerKg: 35, xpPerKg: 65 },
    { name: 'Sébaste de l\'Atlantique', rate: 0.03, minW: 0.5, maxW: 7.7, trophyW: 5.5, blueTrophyW: 7.0, valuePerKg: 55, xpPerKg: 70 },
    { name: 'Saumon des Dieux', rate: 0.015, minW: 5.0, maxW: 220.0, trophyW: 140.0, blueTrophyW: 200.0, valuePerKg: 120, xpPerKg: 180 },
    { name: 'Chimère Commune', rate: 0.005, minW: 1.0, maxW: 2.75, trophyW: 1.5, blueTrophyW: 2.5, valuePerKg: 200, xpPerKg: 190 },
    { name: 'Espadon', rate: 0.005, minW: 12.0, maxW: 495.0, trophyW: 300.0, blueTrophyW: 450.0, valuePerKg: 150, xpPerKg: 210 },
    { name: 'Thon rouge', rate: 0.003, minW: 15.0, maxW: 440.0, trophyW: 250.0, blueTrophyW: 400.0, valuePerKg: 180, xpPerKg: 250 },
    { name: 'Requin du Groenland', rate: 0.003, minW: 20.0, maxW: 990.0, trophyW: 600.0, blueTrophyW: 900.0, valuePerKg: 180, xpPerKg: 220 },
    { name: 'Requin-Taupe', rate: 0.002, minW: 10.0, maxW: 220.0, trophyW: 140.0, blueTrophyW: 200.0, valuePerKg: 200, xpPerKg: 240 },
    { name: 'Requin-lézard', rate: 0.001, minW: 2.0, maxW: 77.0, trophyW: 50.0, blueTrophyW: 70.0, valuePerKg: 220, xpPerKg: 280 },
    { name: 'Requin Pèlerin', rate: 0.02, minW: 25.0, maxW: 2200.0, trophyW: 1500.0, blueTrophyW: 2000.0, valuePerKg: 120, xpPerKg: 220 },
    { name: 'Poisson Football de L\'Atlantique', rate: 0.0002, minW: 0.5, maxW: 9.35, trophyW: 7.0, blueTrophyW: 8.5, valuePerKg: 1000, xpPerKg: 1500 }
  ]
};

const WATER_BODIES = {
  'Lac aux moustique': { levelRequired: 1, travelCost: 0, mult: 1.0, styles: ['fond'] },
  'Rivière Belaya': { levelRequired: 3, travelCost: 100, mult: 1.8, styles: ['leurre', 'vif'] },
  'Lac cuivré': { levelRequired: 12, travelCost: 500, mult: 3.5, styles: ['fond'] },
  'Mer de Norvège': { levelRequired: 20, travelCost: 2000, mult: 10.0, styles: ['leurre'] }
};

const RODS = {
  'Comfort FD360': { maxW: 4.5, cost: 0, addPower: 0, levelRequired: 1, mapName: 'Lac aux moustique' },
  'Siberia Model-Two FD420H': { maxW: 8.5, cost: 180, addPower: 2, levelRequired: 3, mapName: 'Rivière Belaya' },
  'Siberia Fortuna Carp 360XH': { maxW: 16.0, cost: 550, addPower: 6, levelRequired: 12, mapName: 'Lac cuivré' },
  'KingFisher Legacy Ti': { maxW: 32.0, cost: 2400, addPower: 30, levelRequired: 20, mapName: 'Mer de Norvège' }
};

const REELS = {
  'Express Fishing Spark 1 2000S': { maxDrag: 4.6, cost: 0, multiplier: 1.0, levelRequired: 1, mapName: 'Lac aux moustique' },
  'Siberia Gold 60S': { maxDrag: 6.5, cost: 220, multiplier: 1.20, levelRequired: 3, mapName: 'Rivière Belaya' },
  'Beluga Venga Classic 10000': { maxDrag: 9.5, cost: 950, multiplier: 1.80, levelRequired: 12, mapName: 'Lac cuivré' },
  'Reef Turion SW 30000': { maxDrag: 22.5, cost: 3500, multiplier: 4.00, levelRequired: 20, mapName: 'Mer de Norvège' }
};

const LINES = {
  'Siberia Mono SS (3.2kg)': { strength: 3.2, thickness: 0.18, type: 'Nylon', cost: 0, critChance: 0.0, levelRequired: 1, mapName: 'Lac aux moustique' },
  'Siberia Fluorocarbone (5.4kg)': { strength: 5.4, thickness: 0.25, type: 'Fluorocarbone', cost: 60, critChance: 0.06, levelRequired: 3, mapName: 'Rivière Belaya' },
  'Siberia Tresse (11.5kg)': { strength: 11.5, thickness: 0.32, type: 'Tresse', cost: 150, critChance: 0.12, levelRequired: 12, mapName: 'Lac cuivré' },
  'Siberia DevilBraid Tresse (22kg)': { strength: 22.0, thickness: 0.45, type: 'Tresse', cost: 380, critChance: 0.20, levelRequired: 20, mapName: 'Mer de Norvège' }
};

const BAITS = {
  'Ver de vase': { category: 'vers', cost: 10, addPower: 0.5, levelRequired: 1, mapName: 'Lac aux moustique' },
  'Pain': { category: 'artificiel', cost: 0, addPower: 0.0, levelRequired: 1, mapName: 'Lac aux moustique' },
  'Popper Surface (5g)': { category: 'leurres', cost: 30, addPower: 1.0, levelRequired: 1, mapName: 'Lac aux moustique' },

  'Ver rouge': { category: 'vers', cost: 25, addPower: 1.5, levelRequired: 3, mapName: 'Rivière Belaya' },
  'Vif (Petit Gardon)': { category: 'vifs', cost: 80, addPower: 3.0, levelRequired: 3, mapName: 'Rivière Belaya' },
  'Bouillettes Fraise': { category: 'artificiel', cost: 40, addPower: 1.5, levelRequired: 3, mapName: 'Rivière Belaya' },
  'Shad Souple (12g)': { category: 'leurres', cost: 75, addPower: 2.0, levelRequired: 3, mapName: 'Rivière Belaya' },

  'Ver de fumier': { category: 'vers', cost: 50, addPower: 2.5, levelRequired: 12, mapName: 'Lac cuivré' },
  'Vif (Rotengle)': { category: 'vifs', cost: 150, addPower: 6.0, levelRequired: 12, mapName: 'Lac cuivré' },
  'Pellets Halibut': { category: 'artificiel', cost: 120, addPower: 4.0, levelRequired: 12, mapName: 'Lac cuivré' },
  'Wobbler Dur (25g)': { category: 'leurres', cost: 160, addPower: 5.0, levelRequired: 12, mapName: 'Lac cuivré' },

  'Vif (Perche)': { category: 'vifs', cost: 300, addPower: 8.0, levelRequired: 20, mapName: 'Mer de Norvège' },
  'Amorce Marine': { category: 'artificiel', cost: 250, addPower: 15.0, levelRequired: 20, mapName: 'Mer de Norvège' },
  'Cuillere Spoon (40g)': { category: 'leurres', cost: 320, addPower: 20.0, levelRequired: 20, mapName: 'Mer de Norvège' }
};

const AUTO_FISHERS = {
  'Amorceur automatique': { baseCost: 50, sps: 0.1, desc: 'Amorce le spot de pêche automatiquement.' },
  'Canne sur RodPods': { baseCost: 250, sps: 0.5, desc: 'Une canne posée passivement qui attend les touches.' },
  'Pêcheur débutant': { baseCost: 500, sps: 1.0, desc: 'Embauche un ami pêcheur pour vous aider.' },
  'Filet de dérive': { baseCost: 1000, sps: 2.0, desc: 'Un filet posé capturant les poissons en continu.' },
  'Pêcheur Pro': { baseCost: 5000, sps: 5.0, desc: 'Un professionnel de la pêche à vos côtés.' },
  'Bateau de traîne': { baseCost: 15000, sps: 10.0, desc: 'Pêche automatique à la traîne en bateau.' },
  'Chalutier': { baseCost: 50000, sps: 25.0, desc: 'Production industrielle de poissons.' }
};

const AUTO_CLICKER = {
  'Auto-cliqueur (Niv 1)': { baseCost: 100, sps: 0.2, desc: 'Génère 0.2 Silver par seconde automatiquement.' },
  'Auto-cliqueur (Niv 2)': { baseCost: 500, sps: 1.0, desc: 'Génère 1.0 Silver par seconde automatiquement.' },
  'Auto-cliqueur (Niv 3)': { baseCost: 2500, sps: 4.0, desc: 'Génère 4.0 Silver par seconde automatiquement.' },
  'Auto-cliqueur (Niv 4)': { baseCost: 10000, sps: 15.0, desc: 'Génère 15.0 Silver par seconde automatiquement.' },
  'Auto-cliqueur (Niv 5)': { baseCost: 50000, sps: 50.0, desc: 'Génère 50.0 Silver par seconde automatiquement.' }
};

module.exports = {
  FISH_DATABASE,
  WATER_BODIES,
  RODS,
  REELS,
  LINES,
  BAITS,
  AUTO_FISHERS,
  AUTO_CLICKER
};

export const mapRaritySortWeight = (rarity: string): number => {
  const raritySortWeights: Record<string, number> = {
    // Common rarities
    "Common": 0,
    "Uncommon": 1,

    // Basic rare types
    "Rare": 2,
    "Rare Holo": 3,

    // Special rare types
    "Amazing Rare": 4,
    "Rare ACE": 5,
    "Rare BREAK": 6,
    "Rare Holo EX": 7,
    "Double Rare": 7,
    "Rare Holo GX": 8,
    "Rare Holo LV.X": 9,
    "Rare Holo V": 10,
    "Rare Holo VMAX": 11,
    "Rare Holo VSTAR": 12,
    "Rare Prime": 13,
    "Rare Prism Star": 14,

    // Ultra rare types
    "Ultra Rare": 15,
    "Rare Ultra": 16,
    "Rare Rainbow": 18,
    "Trainer Gallery Rare Holo": 33,

    // Special illustration types
    "Illustration Rare": 17,
    "Special Illustration Rare": 18,
    
    // Shiny rare types
    "Rare Shiny": 20,
    "Rare Shiny GX": 21,
    "Shiny Ultra Rare": 22,
    "Hyper Rare": 23,
    "Shiny Rare": 23,

    // Other special types
    "ACE SPEC Rare": 25,
    "LEGEND": 26,
    "Radiant Rare": 27,
    "Rare Holo Star": 28,
    "Rare Secret": 29,
    "Rare Shining": 30,

    // Promo and special collections
    "Promo": 31,
    "Classic Collection": 32,

    // Default for unknown rarities
    "Unknown": 34
  };

  return raritySortWeights[rarity] ?? raritySortWeights["Unknown"];
};

import { Currency } from "@/constants/Currency";
import currency from "currency.js";

export const mapRaritySortWeight = (rarity: string): number => {
  const raritySortWeights: Record<string, number> = {
    // Common rarities
    Common: 0,
    Uncommon: 1,

    // Basic rare types
    Rare: 2,
    "Rare Holo": 3,
    "Rare Shiny": 4,
    "Shiny Rare": 4,
    "Radiant Rare": 5,
    "Amazing Rare": 6,

    // Special rare types
    "Rare BREAK": 7,
    "Rare Holo EX": 8,
    "Double Rare": 9,
    "Trainer Gallery Rare Holo": 9,
    "Rare Holo GX": 10,
    "Rare Holo LV.X": 11,
    "Rare Holo V": 12,
    "Rare Holo VMAX": 13,
    "Rare Holo VSTAR": 14,
    "Rare Prime": 15,
    "Rare Prism Star": 16,
    "Rare ACE": 17,

    // Ultra rare types
    "Ultra Rare": 18,
    "Rare Ultra": 18,
    "Rare Rainbow": 19,
    "Shiny Ultra Rare": 20,

    // Special illustration types
    "Illustration Rare": 22,
    "Special Illustration Rare": 23,

    // Shiny rare types
    "Rare Shiny GX": 24,
    "Hyper Rare": 25,

    // Other special types
    "ACE SPEC Rare": 27,
    LEGEND: 28,
    "Rare Holo Star": 29,
    "Rare Secret": 30,
    "Rare Shining": 31,

    // Promo and special collections
    Promo: 0,
    "Classic Collection": 0,

    // Default for unknown rarities
    Unknown: 0,
  };

  return raritySortWeights[rarity] ?? raritySortWeights["Unknown"];
};

export const convertCurrency = (
  price: string | undefined,
  currencyToConvertTo: Currency
): string => {
  if (!price) return "N/A";
  return currency(price, { symbol: currencyToConvertTo.symbol })
    .multiply(currencyToConvertTo.rate)
    .format();
};

export const Currency = {
  USD: {symbol: '$', name: 'USD', rate: 1},
  EUR: {symbol: '€', name: 'EUR', rate: 0.92},
  GBP: {symbol: '£', name: 'GBP', rate: 0.78},
  JPY: {symbol: '¥', name: 'JPY', rate: 160.0},
  AUD: {symbol: '$', name: 'AUD', rate: 1.48},
  CAD: {symbol: '$', name: 'CAD', rate: 1.36},
  CNY: {symbol: '¥', name: 'CNY', rate: 7.27},
  KRW: {symbol: '₩', name: 'KRW', rate: 1377.0},
}

export type Currency = typeof Currency[keyof typeof Currency];
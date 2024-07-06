export const Currency = {
  USD: {symbol: '$', name: 'USD'},
  EUR: {symbol: '€', name: 'EUR'},
  GBP: {symbol: '£', name: 'GBP'},
  JPY: {symbol: '¥', name: 'JPY'},
  AUD: {symbol: '$', name: 'AUD'},
  CAD: {symbol: '$', name: 'CAD'},
  CNY: {symbol: '¥', name: 'CNY'},
}

export type Currency = typeof Currency[keyof typeof Currency];
export enum Sort {
  Id = 'id',
  Name = 'name',
  Rarity = 'rarity',
  Price = 'price',
  Date = 'date',
  Set = 'set',
  Series = 'series',
  HP = 'hp',
}

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export const SortOptions: SelectOption[] = [
  { label: 'ID', value: Sort.Id, emoji: '\u{1F194}' }, // 🆔
  { label: 'Name', value: Sort.Name, emoji: '\u{1F4DD}' }, // 📝
  { label: 'Rarity', value: Sort.Rarity, emoji: '\u{2728}' }, // ✨
  { label: 'Price', value: Sort.Price, emoji: '\u{1F4B0}' }, // 💰
  { label: 'Date', value: Sort.Date, emoji: '\u{1F4C5}' }, // 📅
  { label: 'Set', value: Sort.Set, emoji: '\u{1F4C1}' }, // 📁
  { label: 'Series', value: Sort.Series, emoji: '\u{1F4DA}' }, // 📚
  { label: 'HP', value: Sort.HP, emoji: '\u{2764}' }, // ❤️
];

export const SortDirectionOptions: SelectOption[] = [
  { label: 'Asc.', value: SortDirection.Asc, emoji: '\u{2B06}' }, // ⬆️
  { label: 'Desc.', value: SortDirection.Desc, emoji: '\u{2B07}' }, // ⬇️
];

export interface SelectOption {
  label: string;
  value: string;
  emoji?: string;
}

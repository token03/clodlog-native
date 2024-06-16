export enum Sort {
  Id = "id",
  Name = "name",
  Rarity = "rarity",
  Price = "price",
  Date = "date",
}

export enum SortDirection {
  Asc = "asc",
  Desc = "desc",
}

export const SortOptions = [
  { label: "ID", value: Sort.Id },
  { label: "Name", value: Sort.Name },
  { label: "Rarity", value: Sort.Rarity },
  { label: "Price", value: Sort.Price },
];

export const SortDirectionOptions = [
  { label: "Asc.", value: SortDirection.Asc },
  { label: "Desc.", value: SortDirection.Desc },
];


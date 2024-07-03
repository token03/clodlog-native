import { Theme, Display, DisplayGridColumns } from "../types/settings";
import { Sort, SortDirection } from "../types/sort";

export class Settings {
  theme: Theme = 'light';
  display: Display = 'grid';
  displayGridColumns: DisplayGridColumns = 3;
  sort: Sort = Sort.Id;
  sortDirection: SortDirection = SortDirection.Asc;

  constructor(init?: Partial<Settings>) {
    Object.assign(this, init);
  }
}

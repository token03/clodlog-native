import { Theme, DisplayGrid, } from "../types/settings";
import { Sort, SortDirection } from "../types/sort";
import {Currency} from "../constants/Currency";

export class Settings {
  theme: Theme = 'light';
  display: DisplayGrid = 'image';
  
  displayGridColumns: number = 2;
  
  
  defaultSort: Sort = Sort.Id;
  defaultSortDirection: SortDirection = SortDirection.Asc;
  
  currency: Currency = Currency.USD;

  constructor(init?: Partial<Settings>) {
    Object.assign(this, init);
  }
  
  static MAX_GRID_COLUMNS = 5;
  static MIN_GRID_COLUMNS = 1;
}

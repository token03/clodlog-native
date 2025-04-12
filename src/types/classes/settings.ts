import { DisplayGrid, Theme } from "../settings";
import { Sort, SortDirection } from "../sort";
import { Currency } from "@/constants/Currency";
import { PriceType } from "@/types/enums/PriceType";

export class Settings {
  theme: Theme = "light";
  display: DisplayGrid = "image";

  holographic: boolean = true;

  displayGridColumns: number = 2;
  defaultSort: Sort = Sort.Id;
  defaultSortDirection: SortDirection = SortDirection.Asc;
  alwaysDisplayPrice: boolean = false;

  currency: Currency = Currency.USD;
  gridPriceType: PriceType = PriceType.Ungraded;

  constructor(init?: Partial<Settings>) {
    Object.assign(this, init);
  }

  static MAX_GRID_COLUMNS = 5;
  static MIN_GRID_COLUMNS = 1;
}

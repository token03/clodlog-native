import {CardResume} from "@tcgdex/sdk";

export type Wishlist = {
  id: string;
  name: string;
  cards: Array<CardResume>;
  dateCreated: string;
};

import {Card} from "classes/card";

export type Wishlist = {
  id: string;
  name: string;
  cards: Array<Card>;
  dateCreated: string;
};

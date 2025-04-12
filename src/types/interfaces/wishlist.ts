import {Card} from "../classes/card";

export interface Wishlist {
  id: string;
  name: string;
  cards: Card[];
  dateCreated: string;
}

export interface WishlistRecord {
  [key: string]: Wishlist;
}

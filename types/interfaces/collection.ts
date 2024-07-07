import {Card} from "../classes/card";

export interface Collection {
  id: string;
  name: string;
  cards: Card[];
  dateCreated: string;
}

export interface CollectionRecord {
  [key: string]: Collection;
}

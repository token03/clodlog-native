import { IAbility } from "types/interfaces/ability";
import { IAncientTrait } from "types/interfaces/ancientTrait";
import { IAttack } from "types/interfaces/attack";
import { ICard } from "types/interfaces/card";
import { ICardImage } from "types/interfaces/image";
import { ILegality } from "types/interfaces/legality";
import { IQuery } from "types/interfaces/query";
import { IResistance } from "types/interfaces/resistance";
import { ISet } from "types/interfaces/set";
import { IWeakness } from "types/interfaces/weakness";
import {QueryBuilder} from "./queryBuilder";

export class Card implements ICard{
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  evolesFrom?: string;
  evolvesTo?: string[];
  rules?: string[];
  ancientTrait?: IAncientTrait;
  abilities?: IAbility[];
  attacks?: IAttack[];
  weaknesses?: IWeakness[];
  resistances?: IResistance[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: ISet;
  number: string;
  artist?: string;
  rarity: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  legalities: ILegality;
  regulationMark?: string;
  images: ICardImage;
  prices?: Record<string, Record<string, string>>;

  constructor(id: string, name: string, supertype: string, subtypes: string[], set: ISet, number: string, rarity: string, legalities: ILegality, images: ICardImage) {
    this.id = id;
    this.name = name;
    this.supertype = supertype;
    this.subtypes = subtypes;
    this.set = set;
    this.number = number;
    this.rarity = rarity;
    this.legalities = legalities;
    this.images = images;
  }
  
  static resource(): string {
    return 'card';
  }
  
  static async find(id: string): Promise<Card> {
    return QueryBuilder.find(Card.resource(), id)
  }
  
  static async findBySetId(): Promise<Card[]> {
    return QueryBuilder.all(Card.resource() + '/set');
  }

  static async all(): Promise<Card[]> {
    return QueryBuilder.all(Card.resource());
  }

  static async where(params: IQuery[]): Promise<Card[]> {
    return QueryBuilder.where(Card.resource(), params);
  }
}

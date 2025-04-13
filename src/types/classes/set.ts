import { ISet } from 'types/interfaces/set';
import { IQuery } from 'types/interfaces/query';
import { QueryBuilder } from './queryBuilder';
import { ILegality } from 'types/interfaces/legality';
import { ISetImage } from 'types/interfaces/image';
import { Card } from './card';

export class Set implements ISet {
  id: string;
  images: ISetImage;
  legalities: ILegality;
  name: string;
  printedTotal: number;
  ptcgoCode: string;
  releaseDate: string;
  series: string;
  total: number;
  updatedAt: string;
  cards?: Card[];

  constructor(
    id: string,
    images: ISetImage,
    legalities: ILegality,
    name: string,
    printedTotal: number,
    ptcgoCode: string,
    releaseDate: string,
    series: string,
    total: number,
    updatedAt: string
  ) {
    this.id = id;
    this.images = images;
    this.legalities = legalities;
    this.name = name;
    this.printedTotal = printedTotal;
    this.ptcgoCode = ptcgoCode;
    this.releaseDate = releaseDate;
    this.series = series;
    this.total = total;
    this.updatedAt = updatedAt;
  }

  static resource(): string {
    return 'set';
  }

  static async find(id: string): Promise<Set> {
    return QueryBuilder.find(Set.resource(), id);
  }

  static async all(): Promise<Set[]> {
    return QueryBuilder.all(Set.resource());
  }

  static async where(params: IQuery[]): Promise<Set[]> {
    return QueryBuilder.where(Set.resource(), params);
  }

  static async groupBySeries(): Promise<Record<string, Set[]>> {
    return QueryBuilder.group(Set.resource(), 'series');
  }
}

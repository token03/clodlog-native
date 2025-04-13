import { Client } from './client';

export class Meta {
  static async allSets(): Promise<string[]> {
    return await Client.get('meta/sets');
  }

  static async allSeries(): Promise<string[]> {
    return await Client.get('meta/series');
  }

  static async allTypes(): Promise<string[]> {
    return await Client.get('meta/types');
  }

  static async allSubtypes(): Promise<string[]> {
    return await Client.get('meta/subtypes');
  }

  static async allSupertypes(): Promise<string[]> {
    return await Client.get('meta/supertypes');
  }

  static async allRarities(): Promise<string[]> {
    return await Client.get('meta/rarities');
  }

  static async allArtists(): Promise<string[]> {
    return await Client.get('meta/artists');
  }

  static async allHp(): Promise<string[]> {
    return await Client.get('meta/hp');
  }
}

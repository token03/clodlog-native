export const getSetSymbolUrl = (set: string) => {
  return `https://images.pokemontcg.io/${set}/symbol.png`;
}

export const createSetLogoUrl = (set: string) => {
  // remove leading zeros after series id
  set = correctSetId(set);
  return `https://images.pokemontcg.io/${set}/logo.png`;
}

export const getCardImageUrl = (set: string, id: string, isHiRes: boolean) => {
  // remove leading zeros
  id = id.replace(/^0+/, '');
  return `https://images.pokemontcg.io/${set}/${id}}${isHiRes ? "_hires" : ""}.png`;
}

const correctSetId = (set: string) => {
  // remove leading zeros after series id
  set = set.replace(/(^[a-z]+)0+/, '$1');
  // replace any . with pt
  set = set.replace(/\./g, 'pt');
  return set;
}

const getSetSymbolUrl = (set: string) => {
  return `https://images.pokemontcg.io/${set}/symbol.png`;
}

const getSeLogoUrl = (set: string) => {
  return `https://images.pokemontcg.io/${set}/logo.png`;
}

const getCardImageUrl = (set: string, id: string, isHiRes: boolean) => {
  return `https://images.pokemontcg.io/${set}/${id}}${isHiRes ? "_hires" : ""}.png`;
}

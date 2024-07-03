import React, {useEffect} from 'react';
import {ScrollView, View, XStack} from 'tamagui';
import {DisplayGridCard} from "./DisplayGridCard";
import {FlatList} from "react-native";
import {Sort, SortDirection} from "../../types/sort";
import {Card} from "../../classes/card";
import {mapRaritySortWeight} from "../../utils/cardUtils";
import {useWishlists} from "../../contexts/WishlistContext";
import {useCollections} from "../../contexts/CollectionContext";

type CardGridProps = {
  cards: Array<Card>;
  numColumns: number;
  route: string;
  sort?: Sort;
  sortDirection?: SortDirection;
};
export const CardGrid = ({ cards, numColumns, route, sort, sortDirection } : CardGridProps) => {
  const { itemCardsRecord: wishlistCardsRecord } = useWishlists();
  const { itemCardsRecord: collectionCardsRecord } = useCollections();
  const [sortedCards, setSortedCards] = React.useState<Array<Card>>(cards);
  const [selectedCardsRecord, setSelectedCardsRecord] = React.useState<Record<string, Card[]>>({});
  
  const selectCard = (card: Card) => {
    setSelectedCardsRecord((prevSelectedCards) => {
      const existingCards = prevSelectedCards[card.id] || [];
      return { ...prevSelectedCards, [card.id]: [...existingCards, card] };
    });
  }
  
  const deselectCard = (card: Card) => {
    setSelectedCardsRecord((prevSelectedCards) => {
      const newSelectedCards = { ...prevSelectedCards };
      delete newSelectedCards[card.id];
      return newSelectedCards;
    })
  }
  
  const deselectAllCards = () => {
    setSelectedCardsRecord({});
  }

  useEffect(() => {
    const sortCards = (data: Card[], sortField: Sort | undefined, sortOrder: SortDirection | undefined): Card[] => {
      if (!sortField || !sortOrder) return data;

      return [...data].sort((a: Card, b: Card) => {
        const compareAsc = (aVal: string | number, bVal: string | number): number => {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        };

        const compareDesc = (aVal: string | number, bVal: string | number): number => {
          return bVal < aVal ? -1 : bVal > aVal ? 1 : 0;
        };

        const compare = sortOrder === SortDirection.Asc ? compareAsc : compareDesc;

        switch (sortField) {
          case Sort.Name:
            return compare(a.name, b.name);
          case Sort.Id:
            const aNum = parseInt(a.number.replace(/\D/g, ''), 10);
            const bNum = parseInt(b.number.replace(/\D/g, ''), 10);
            if (aNum === bNum) {
              return compare(a.number, b.number);
            }
            return compare(aNum, bNum);
          case Sort.Rarity:
            return compare(mapRaritySortWeight(a.rarity), mapRaritySortWeight(b.rarity));
          case Sort.Date:
            return compare(a.set.releaseDate, b.set.releaseDate);
          case Sort.Price:
            const aSortPrice =  parseFloat(a.prices?.["normal"]?.["ungraded"]?.replace("$", "") || "0");
            const bSortPrice =  parseFloat(b.prices?.["normal"]?.["ungraded"]?.replace("$", "") || "0");
            return compare(aSortPrice, bSortPrice);
          default:
            return 0;
        }
      });
    };

    const sortedCards = sortCards(cards, sort, sortDirection);
    setSortedCards(sortedCards);
  }, [cards, sort, sortDirection]);


    
  return (
    <FlatList
      data={sortedCards}
      style={{ paddingVertical: 5 }}
      renderItem={({ item }) => (
        <View 
          padding={"$1.5"} 
          width={`calc(100% / ${numColumns})`}
          justifyContent={"center"} 
          aspectRatio={245 / 342}
        >
          <DisplayGridCard
            route={route}
            card={item}
            isInWishlist={wishlistCardsRecord[item.id] !== undefined}
            isInCollection={collectionCardsRecord[item.id] !== undefined}
            isSelected={selectedCardsRecord[item.id] !== undefined}
            selectingMode={Object.keys(selectedCardsRecord).length > 0}
            selectCard={selectCard}
            deselectCard={deselectCard}
          />
        </View>
      )}
      columnWrapperStyle={{
        marginHorizontal: 13,
    }}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      numColumns={numColumns}
    />
  );
}

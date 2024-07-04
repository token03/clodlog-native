import React, {useEffect, useMemo} from 'react';
import { FlatList } from 'react-native';
import { DisplayGridCard } from "./DisplayGridCard";
import { Sort, SortDirection } from "../../types/sort";
import { Card } from "../../classes/card";
import { mapRaritySortWeight } from "../../utils/cardUtils";
import { useWishlists } from "../../contexts/WishlistContext";
import { useCollections } from "../../contexts/CollectionContext";
import {View} from "tamagui";
import {GRID_CARD_ASPECT_RATIO} from "../../constants/DisplayCards";

const MAX_CARDS_PER_BATCH = 15;
const INITIAL_CARDS_TO_RENDER = 10;
const WINDOW_SIZE = 3;

type CardGridProps = {
  cards: Array<Card>;
  numColumns: number;
  route: string;
  sort?: Sort;
  sortDirection?: SortDirection;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
};

export const CardGrid = ({ cards, numColumns, route, sort, sortDirection, ListHeaderComponent }: CardGridProps) => {
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
  
  const renderItem = useMemo(() => ({ item }) => (
    <View
      padding={"$1.5"}
      width={`calc(100% / ${numColumns})`}
      justifyContent={"center"}
      aspectRatio={GRID_CARD_ASPECT_RATIO}
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
  ), [route, wishlistCardsRecord, collectionCardsRecord, selectedCardsRecord]);

  return (
    <FlatList
      data={sortedCards}
      scrollEnabled={true}
      overScrollMode={"never"}
      maxToRenderPerBatch={INITIAL_CARDS_TO_RENDER}
      initialNumToRender={MAX_CARDS_PER_BATCH}
      renderItem={renderItem}
      columnWrapperStyle={{
        marginHorizontal: 13,
      }}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      windowSize={WINDOW_SIZE}
      numColumns={numColumns}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={ListHeaderComponent}
      stickyHeaderIndices={ListHeaderComponent ? [0] : undefined}
    />
  );
}

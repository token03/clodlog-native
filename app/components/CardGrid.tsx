import React, {useEffect, useMemo} from 'react';
import { FlatList } from 'react-native';
import { DisplayGridCard } from "./DisplayGridCard";
import { Sort, SortDirection } from "../../types/sort";
import { Card } from "../../types/classes/card";
import {convertCurrency, mapRaritySortWeight} from "../../utils/cardUtils";
import { useWishlists } from "../../contexts/WishlistContext";
import { useCollections } from "../../contexts/CollectionContext";
import {Paragraph, View} from "tamagui";
import {GRID_CARD_ASPECT_RATIO} from "../../constants/DisplayCards";
import {useSettings} from "../../contexts/SettingContext";

const MAX_CARDS_PER_BATCH = 15;
const INITIAL_CARDS_TO_RENDER = 10;
const WINDOW_SIZE = 3;

type CardGridProps = {
  cards: Array<Card>;
  route: string;
  sort?: Sort;
  sortDirection?: SortDirection;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
};

export const CardGrid = ({ cards, route, sort, sortDirection, ListHeaderComponent }: CardGridProps) => {
  const { itemCardsRecord: wishlistCardsRecord } = useWishlists();
  const { itemCardsRecord: collectionCardsRecord } = useCollections();
  const [sortedCards, setSortedCards] = React.useState<Array<Card>>(cards);
  const [selectedCardsRecord, setSelectedCardsRecord] = React.useState<Record<string, Card[]>>({});
  const [scrollToTop, setScrollToTop] = React.useState<boolean>(false);
  
  const { settings } = useSettings();
  
  const flatListRef = React.useRef<FlatList>(null);

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
    if (scrollToTop && flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      setScrollToTop(false);
    }
  }, [scrollToTop]);

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
    setScrollToTop(true)
  }, [cards, sort, sortDirection]);
  
  const renderItem = useMemo(() => ({ item }) => (
    <View
      padding={"$1.5"}
      width={`${100 / settings.displayGridColumns}%`}
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
      {/*TODO: PRICES ARE SAVE TO ASYNC ON SAVE SO WHEN DISPLAYING FROM WISHLIST/COLLECTION ITS OUT OF DATE (BAD!!!!)*/}
      {
        (sort === Sort.Price || settings.alwaysDisplayPrice) && (
          <View
            position={"absolute"}
            bottom={"$1.5"}
            right={"$1.5"}
            padding={"$1"}
            backgroundColor={"rgba(0, 0, 0, 0.5)"} // Adjust the last value for opacity
            borderRadius={"$1"}
          >
            <Paragraph size={"$1"}>{convertCurrency(item.prices?.["normal"]?.[settings.gridPriceType], settings.currency)}</Paragraph>
          </View>
        )
      }
    </View>
  ), [route, sort, wishlistCardsRecord, collectionCardsRecord, selectedCardsRecord, settings]);

  return (
    <FlatList
      key={settings.displayGridColumns}
      ref={flatListRef}
      data={sortedCards}
      scrollEnabled={true}
      overScrollMode={"never"}
      maxToRenderPerBatch={INITIAL_CARDS_TO_RENDER}
      initialNumToRender={MAX_CARDS_PER_BATCH}
      renderItem={renderItem}
      columnWrapperStyle={settings.displayGridColumns > 1 ? {marginHorizontal: 13} : null}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      windowSize={WINDOW_SIZE}
      numColumns={settings.displayGridColumns}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={ListHeaderComponent}
      stickyHeaderIndices={ListHeaderComponent ? [0] : undefined}
    />
  );
}

import React, {useEffect} from 'react';
import {ScrollView, View, XStack} from 'tamagui';
import {DisplayGridCard} from "./DisplayGridCard";
import {FlatList} from "react-native";
import {Sort, SortDirection} from "../../types/sort";
import {Card} from "../../classes/card";
import {mapRaritySortWeight} from "../../utils/cardUtils";

type CardGridProps = {
  cards: Array<Card>;
  numColumns: number;
  route: string;
  sort?: Sort;
  sortDirection?: SortDirection;
};
export const CardGrid = ({ cards, numColumns, route, sort, sortDirection } : CardGridProps) => {
  const [sortedCards, setSortedCards] = React.useState<Array<Card>>(cards);


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
            return compare(parseInt(a.number, 10), parseInt(b.number, 10));
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
      renderItem={({ item }) => (
        <View paddingVertical={"$2"} width={"50%"} height={"$17"} justifyContent={"center"}>
          <DisplayGridCard
            route={route}
            card={item}
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

import React, {useEffect} from 'react';
import {ScrollView, View, XStack} from 'tamagui';
import {DisplayGridCard} from "./DisplayGridCard";
import {FlatList} from "react-native";
import {Sort, SortDirection} from "../../types/sort";
import {Card} from "../../classes/card";

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
    const sortCards = (data: Card[], sortField: Sort | undefined, sortOrder: SortDirection | undefined) : Card[] => {
      if (!sortField || !sortOrder) return data;

      return [...data].sort((a, b) => {
        const sortFn = {
          [Sort.Name]: (sortOrder === SortDirection.Asc)
            ? (a, b) => a.name.localeCompare(b.name)
            : (a, b) => b.name.localeCompare(a.name),
          [Sort.Id]: (sortOrder === SortDirection.Asc)
            ? (a, b) => parseInt(a.number, 10) - parseInt(b.number, 10)
            : (a, b) => parseInt(b.number, 10) - parseInt(a.number, 10),
        };

        return sortFn[sortField](a, b);
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

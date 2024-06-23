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
    let sorted = [...cards]; // Create a new array
    if (sort && sortDirection) {
      sorted.sort((a, b) => {
        if (sort === Sort.Name) {
          if (sortDirection === SortDirection.Asc) {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        } else if (sort === Sort.Id) {
          if (sortDirection === SortDirection.Asc) {
            return a.number.localeCompare(b.number);
          } else {
            return b.number.localeCompare(a.number);
          }
        } else {
          return 0;
        }
      });
    }
    setSortedCards(sorted);
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

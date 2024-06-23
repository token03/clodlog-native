import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {H6, Label, ScrollView, XStack} from "tamagui";
import {CardGrid} from "../components/CardGrid";
import {useNavigation} from "expo-router";
import {Filter, MoreVertical} from "@tamagui/lucide-icons";
import {SelectDemoItem} from "../components/Select";
import {Sort, SortDirection, SortDirectionOptions, SortOptions} from "../../types/sort";
import {Set} from "../../classes/set";
import {Card} from "../../classes/card";
import {NoCardsFound} from "./components/NoCardsFound";

type RouteParams = {
  name: string;
};

const SetScreen = () => {
  const [cards, setCards ] = useState<Card[] | null>(null);
  const [sort, setSort] = useState<string>(Sort.Id);
  const [sortDirection, setSortDirection] = useState<string>(SortDirection.Asc);

  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;
  const { name } = params;

  const handleSelectSort = (value: string) => {
    setSort(value);
  }

  const handleSelectSortDirection = (value: string) => {
    setSortDirection(value);
  }

  useEffect(() => {
    const fetchCards = async () => {
      const fetchedCards = await Card.where([{name: "name", value: name || "" }]);
      setCards(fetchedCards);
    }
    fetchCards();
  }, [name]);

  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerTitle: () => (
        <XStack
          alignContent={"center"}
          justifyContent={"space-between"}
          width={"78vw"}
        >
          <H6>{name}</H6>
          <XStack gap={"$3"}>
            <Filter />
            <MoreVertical />
          </XStack>
        </XStack>
      )
    });
  }, [name, navigation]);
  
  if (cards == null || cards.length == 0) {
    return <NoCardsFound/>
  }

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <XStack height={"100%"} backgroundColor={"$background"} paddingVertical={"$2"} gap={"$2"} justifyContent={"center"}>
        <Label size={"$2"} width={"15%"}>
          Sort By:
        </Label>
        <SelectDemoItem width={"40%"} size={"$2"} value={sort} onValueChange={handleSelectSort} items={SortOptions} label={"Sort By:"}/>
        <SelectDemoItem width={"25%"} size={"$2"} value={sortDirection} onValueChange={handleSelectSortDirection} items={SortDirectionOptions} label={"Direction:"} />
      </XStack>
      <CardGrid
        cards={cards ?? []}
        numColumns={2}
        route={"browse"}
        sort={sort as Sort}
        sortDirection={sortDirection as SortDirection}
      />
    </ScrollView>
  );
};

export default SetScreen;

// SearchScreen.tsx
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { H6, View, XStack } from "tamagui";
import { CardGrid } from "../components/CardGrid";
import { useNavigation } from "expo-router";
import { Filter, MoreVertical } from "@tamagui/lucide-icons";
import { Sort, SortDirection } from "../../types/sort";
import { Card } from "../../classes/card";
import { NoCardsFound } from "./components/NoCardsFound";
import { SortHeader } from "../components/SortHeader";
import {ScreenHeader} from "../components/ScreenHeader";

type RouteParams = {
  name?: string,
  series?: string,
};

const SearchScreen = () => {
  const [cards, setCards] = useState<Card[] | null>(null);
  const [sort, setSort] = useState<string>(Sort.Id);
  const [sortDirection, setSortDirection] = useState<string>(SortDirection.Asc);

  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;
  const { name, series } = params;

  useEffect(() => {
    const fetchCards = async () => {
      const params : {name: string, value: string}[] = [];
      if (name) {
        params.push({name: "name", value: name});
      }
      if (series) {
        params.push({name: "series", value: series});
      }
      const fetchedCards = await Card.where(params);
      setCards(fetchedCards);
    }
    fetchCards();
  }, [name, series]);

  useEffect(() => {
    navigation.setOptions({
      title: name ?? series,
      headerTitle: () => (
        <ScreenHeader title={name ?? series ?? ""} />
      )
    });
  }, [navigation, name, series]);

  if (cards == null || cards.length == 0) {
    return <NoCardsFound />;
  }

  return (
    <View style={{ flex: 1 }}>
      <CardGrid
        cards={cards}
        numColumns={2}
        route={"browse"}
        sort={sort as Sort}
        sortDirection={sortDirection as SortDirection}
        ListHeaderComponent={
          <SortHeader
            sort={sort}
            sortDirection={sortDirection}
            onSortChange={setSort}
            onSortDirectionChange={setSortDirection}
          />
        }
      />
    </View>
  );
};

export default SearchScreen;
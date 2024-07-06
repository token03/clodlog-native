// SetScreen.tsx
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { H6, View, XStack } from "tamagui";
import { CardGrid } from "../components/CardGrid";
import { useNavigation } from "expo-router";
import { Filter, MoreVertical } from "@tamagui/lucide-icons";
import { Sort, SortDirection } from "../../types/sort";
import { Set } from "../../classes/set";
import { SortHeader } from "../components/SortHeader";
import {ScreenHeader} from "../components/ScreenHeader";

type RouteParams = {
  setId: string;
};

const SetScreen = () => {
  const [set, setSet] = useState<Set | null>(null);
  const [sort, setSort] = useState<string>(Sort.Id);
  const [sortDirection, setSortDirection] = useState<string>(SortDirection.Asc);

  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;
  const { setId } = params;

  useEffect(() => {
    const fetchSet = async () => {
      const fetchedSet = await Set.find(setId);
      setSet(fetchedSet);
    }
    fetchSet();
  }, [setId]);

  useEffect(() => {
    if (set) {
      navigation.setOptions({
        title: set.name,
        headerTitle: () => (
          <ScreenHeader title={set.name} />
        )
      });
    }
  }, [set, navigation]);

  return (
    <View style={{ flex: 1 }}>
      <CardGrid
        cards={set?.cards ?? []}
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

export default SetScreen;
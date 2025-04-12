// SetScreen.tsx
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {H6, Paragraph, View, XStack} from "tamagui";
import { CardGrid } from "../components/CardGrid";
import { useNavigation } from "expo-router";
import { Filter, MoreVertical } from "@tamagui/lucide-icons";
import { Sort, SortDirection } from "../../types/sort";
import { Set } from "../../types/classes/set";
import { SortHeader } from "../components/SortHeader";
import {ScreenHeader} from "../components/ScreenHeader";

type RouteParams = {
  setId: string;
};

const SetScreen = () => {
  const [set, setSet] = useState<Set | null>(null);
  const [sort, setSort] = useState<Sort>(Sort.Id);
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Asc);

  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;
  const { setId } = params;
  
  const handleSortChange = (value: Sort) => {
    setSort(value);
  }
  
  const handleSortDirectionChange = (value: SortDirection) => {
    setSortDirection(value);
  }

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
        route={"browse"}
        sort={sort}
        sortDirection={sortDirection as SortDirection}
        ListHeaderComponent={
          <SortHeader
            sort={sort}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
            onSortDirectionChange={handleSortDirectionChange}
          />
        }
      />
    </View>
  );
};

export default SetScreen;
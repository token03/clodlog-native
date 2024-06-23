import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {H6, Label, ScrollView, XStack} from "tamagui";
import {Set} from "../../classes/set";
import {CardGrid} from "../components/CardGrid";
import {useNavigation} from "expo-router";
import {Filter, MoreVertical} from "@tamagui/lucide-icons";
import {SelectDemoItem} from "../components/Select";
import {Sort, SortDirection, SortDirectionOptions, SortOptions} from "../../types/sort";
import {Card} from "../../classes/card";

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
  
  const handleSelectSort = (value: string) => {
    setSort(value);
  }
  
  const handleSelectSortDirection = (value: string) => {
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
          <XStack 
            alignContent={"center"}
            justifyContent={"space-between"}
            width={"78vw"}
          >
            <H6 width={"80%"} textOverflow={"ellipsis"} numberOfLines={1}>{set.name}</H6>
            <XStack gap={"$3"}>
              <Filter />
              <MoreVertical />
            </XStack>
          </XStack>
        )
      });
    }
  }, [set, navigation]);

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
        cards={set?.cards ?? []} 
        numColumns={2} 
        route={"browse"} 
        sort={sort as Sort} 
        sortDirection={sortDirection as SortDirection} 
      />
    </ScrollView>
  );
};

export default SetScreen;
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { View } from "tamagui";
import { CardGrid } from "@/components/CardGrid/CardGrid";
import { useNavigation } from "expo-router";
import { Sort, SortDirection } from "@/types/sort";
import { Card } from "@/types/classes/card";
import { NoCardsFound } from "@/components/Browse";
import { SortHeader } from "@/components/Sort/SortHeader";
import { ScreenHeader } from "@/components/ScreenHeader";

type RouteParams = {
  name?: string;
  series?: string;
};

const SearchScreen = () => {
  const [cards, setCards] = useState<Card[] | null>(null);
  const [sort, setSort] = useState<Sort>(Sort.Id);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.Asc
  );

  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;
  const { name, series } = params;

  const handleSortChange = (value: Sort) => {
    setSort(value);
  };

  const handleSortDirectionChange = (value: SortDirection) => {
    setSortDirection(value);
  };

  useEffect(() => {
    const fetchCards = async () => {
      const params: { name: string; value: string }[] = [];
      if (name) {
        params.push({ name: "name", value: name });
      }
      if (series) {
        params.push({ name: "series", value: series });
      }
      const fetchedCards = await Card.where(params);
      setCards(fetchedCards);
    };
    fetchCards();
  }, [name, series]);

  useEffect(() => {
    navigation.setOptions({
      title: name ?? series,
      headerTitle: () => <ScreenHeader title={name ?? series ?? ""} />,
    });
  }, [navigation, name, series]);

  if (cards == null || cards.length == 0) {
    return <NoCardsFound />;
  }

  return (
    <View style={{ flex: 1 }}>
      <CardGrid
        cards={cards}
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

export default SearchScreen;

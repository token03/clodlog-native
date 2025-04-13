import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useState } from 'react';
import { CardGrid } from '@/components/CardGrid/CardGrid';
import { Sheet } from 'tamagui';
import { BrowseFilterForm } from '@/components/Browse';
import { useWishlists } from '@/contexts/WishlistContext';
import { ActivityIndicator } from 'react-native';
import { Card } from '@/types/classes/card';

const Tab = createMaterialTopTabNavigator();

export default function WishlistTabScreen() {
  const { items: wishlists } = useWishlists();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: { backgroundColor: 'grey' },
        tabBarItemStyle: {
          flex: 1,
          minWidth: 'auto',
          width: 'auto',
        },
        swipeEnabled: true,
      }}
    >
      {wishlists.length === 0 && (
        <Tab.Screen name='LOADING' children={() => <ActivityIndicator />} />
      )}
      {wishlists.map(wishlist => (
        <Tab.Screen
          key={wishlist.id}
          name={wishlist.name}
          children={props => <WishlistScreen {...props} cards={wishlist.cards} />}
        />
      ))}
    </Tab.Navigator>
  );
}

type WishlistScreenProps = {
  cards: Card[];
};

function WishlistScreen({ cards }: WishlistScreenProps) {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const submitFilterRequest = () => {
    setIsFilterOpen(false);
  };

  return (
    <>
      <CardGrid cards={cards} route={'wishlist'} />
      <Sheet
        forceRemoveScrollEnabled={isFilterOpen}
        modal={true}
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        dismissOnSnapToBottom
        zIndex={100_000}
        animation='medium'
      >
        <Sheet.Overlay animation='medium' enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        <Sheet.Handle />
        <Sheet.Frame padding='$4' alignItems='center' backgroundColor={'$black2'}>
          <Sheet.ScrollView width={'100%'}>
            <BrowseFilterForm submitFilter={submitFilterRequest} />
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}

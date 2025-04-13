import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useState } from 'react';
import { CardGrid } from '@/components/CardGrid/CardGrid';
import { Sheet } from 'tamagui';
import { BrowseFilterForm } from '@/components/Browse';
import { useCollections } from '@/contexts/CollectionContext';
import { ActivityIndicator } from 'react-native';
import { Card } from '@/types/classes/card';

const Tab = createMaterialTopTabNavigator();

export default function CollectionTabScreen() {
    const { items: collections } = useCollections();

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
            {collections.length === 0 && (
                <Tab.Screen name='LOADING' children={() => <ActivityIndicator />} />
            )}
            {collections.map(collection => (
                <Tab.Screen
                    key={collection.id}
                    name={collection.name}
                    children={props => <CollectionScreen {...props} cards={collection.cards} />}
                />
            ))}
        </Tab.Navigator>
    );
}

type CollectionScreenProps = {
    cards: Card[];
};

function CollectionScreen({ cards }: CollectionScreenProps) {
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const submitFilterRequest = () => {
        setIsFilterOpen(false);
    };

    return (
        <>
            <CardGrid cards={cards} route={'collection'} />
            <Sheet
                forceRemoveScrollEnabled={isFilterOpen}
                modal={true}
                open={isFilterOpen}
                onOpenChange={setIsFilterOpen}
                dismissOnSnapToBottom
                zIndex={100_000}
                animation='medium'
            >
                <Sheet.Overlay
                    animation='medium'
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                />
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

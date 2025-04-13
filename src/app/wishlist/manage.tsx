import { useCallback, useEffect, useState } from 'react';
import { Label, ScrollView, View, XStack } from 'tamagui';
import { useWishlists } from '@/contexts/WishlistContext';
import { useNavigation } from 'expo-router';
import {
    CreateWishlistDialogButton,
    DeleteWishlistAlertDialogButton,
    EditWishlistDialogButton,
} from '@/components/Wishlist';
import { DndProvider, Draggable, DraggableStack, UniqueIdentifier } from '@mgcrea/react-native-dnd';
import { Wishlist } from '@/types/interfaces/wishlist';
import { ScreenHeader } from '@/components/ScreenHeader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function ManageWishlistsScreen() {
    const { items: initialWishlist, updateItemOrder: updateWishlistOrder } = useWishlists();
    const [renderedWishlists, setRenderedWishlists] = useState(initialWishlist);
    const [refreshKey, setRefreshKey] = useState(0);
    const navigation = useNavigation();

    const refreshScreen = useCallback(() => {
        setRefreshKey(prevKey => prevKey + 1);
    }, []);

    const afterEditWishlist = useCallback((id: string, name: string) => {
        setRenderedWishlists(prevWishlists =>
            prevWishlists.map(wishlist => (wishlist.id === id ? { ...wishlist, name } : wishlist))
        );
    }, []);

    const afterDeleteWishlist = useCallback(
        (id: string) => {
            setRenderedWishlists(prevWishlists =>
                prevWishlists.filter(wishlist => wishlist.id !== id)
            );
            refreshScreen();
        },
        [refreshScreen]
    );

    const afterCreateWishlist = useCallback(
        (wishlist: Wishlist) => {
            setRenderedWishlists(prevWishlists => [...prevWishlists, wishlist]);
            refreshScreen();
        },
        [refreshScreen]
    );

    useEffect(() => {
        navigation.setOptions({
            title: 'Edit Wishlists',
            headerTitle: () => <ScreenHeader title={'Edit Wishlists'} />,
        });
    }, [navigation]);

    const onStackOrderChange = async (orderedIds: UniqueIdentifier[]) => {
        await updateWishlistOrder(orderedIds as string[]);
    };

    return (
        <GestureHandlerRootView>
            <View style={{ flex: 1 }} key={refreshKey}>
                <ScrollView>
                    <View height={'100%'}>
                        <DndProvider>
                            <DraggableStack
                                direction='column'
                                onOrderChange={onStackOrderChange}
                                gap={10}
                                style={{ padding: 10 }}
                            >
                                {renderedWishlists.map(wishlist => (
                                    <Draggable
                                        key={wishlist.id}
                                        id={wishlist.id}
                                        activationTolerance={0}
                                    >
                                        <XStack
                                            width={'100%'}
                                            justifyContent={'space-between'}
                                            backgroundColor={'$black2'}
                                            paddingVertical={'$2'}
                                            borderRadius={'$3'}
                                        >
                                            <Label paddingLeft={'$4'}>{wishlist.name}</Label>
                                            <XStack paddingRight={'$3'}>
                                                <EditWishlistDialogButton
                                                    Wishlist={wishlist}
                                                    afterEdit={afterEditWishlist}
                                                />
                                                <DeleteWishlistAlertDialogButton
                                                    Wishlist={wishlist}
                                                    afterDelete={afterDeleteWishlist}
                                                />
                                            </XStack>
                                        </XStack>
                                    </Draggable>
                                ))}
                            </DraggableStack>
                        </DndProvider>
                    </View>
                </ScrollView>
                <CreateWishlistDialogButton afterCreate={afterCreateWishlist} />
            </View>
        </GestureHandlerRootView>
    );
}

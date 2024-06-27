import React, {useState, useEffect, useCallback, useMemo} from "react";
import { Button, H6, Label, ScrollView, Sheet, View, XStack, YStack } from 'tamagui';
import { useWishlists, WishlistProvider } from "../../contexts/WishlistContext";
import { useNavigation } from "expo-router";
import { Plus, Trash2, Edit3 } from "@tamagui/lucide-icons";
import { CreateWishlistDialogButton } from "./components/CreateWishlistDialogButton";
import { EditWishlistDialogButton } from "./components/EditWishlistDialogButton";
import { DeleteWishlistAlertDialogButton } from "./components/DeleteWishlistAlertDialogButton";
import {DndProvider, Draggable, DraggableGrid, DraggableStack, UniqueIdentifier} from "@mgcrea/react-native-dnd";
import {Wishlist} from "../../types/interfaces/wishlist";

export default function ManageWishlistsScreen() {
  const { wishlistRecord, wishlistOrder, updateWishlistOrder } = useWishlists();
  const navigation = useNavigation();

  // Memoize the ordered wishlists array
  const orderedWishlists = useMemo(() => {
    return wishlistOrder
      .map(id => wishlistRecord[id])
      .filter(Boolean); // Remove any undefined entries
  }, [wishlistOrder, wishlistRecord]);

  useEffect(() => {
    navigation.setOptions({
      title: "Edit Wishlists",
      headerTitle: () => (
        <XStack
          alignContent={"center"}
          justifyContent={"space-between"}
          width={"78vw"}
        >
          <H6>Edit Wishlists</H6>
        </XStack>
      )
    });
  }, [navigation]);

  const onStackOrderChange = (orderedIds: UniqueIdentifier[]) => {
    updateWishlistOrder(orderedIds as string[]);
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View height={"100%"}>
          <DndProvider>
            <DraggableStack
              direction="column"
              onOrderChange={onStackOrderChange}
              gap={10}
              style={{ padding: 20 }}
            >
              {orderedWishlists.map(wishlist => (
                <Draggable key={wishlist.id} id={wishlist.id} activationTolerance={2}>
                  <XStack width={"100%"} justifyContent={"space-between"} backgroundColor={"$black2"} paddingVertical={"$2"} borderRadius={"$3"}>
                    <Label paddingLeft={"$4"}>
                      {wishlist.name}
                    </Label>
                    <XStack paddingRight={"$3"}>
                      <EditWishlistDialogButton Wishlist={wishlist}/>
                      <DeleteWishlistAlertDialogButton Wishlist={wishlist}/>
                    </XStack>
                  </XStack>
                </Draggable>
              ))}
            </DraggableStack>
          </DndProvider>
        </View>
      </ScrollView>
      <CreateWishlistDialogButton/>
    </View>
  );
}

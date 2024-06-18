import React, {useState, useEffect } from "react";
import {Button, H6, Label, ScrollView, Sheet, View, XStack, YStack,} from 'tamagui';
import {useWishlists, WishlistProvider} from "../../contexts/WishlistContext";
import {useNavigation} from "expo-router";
import {Plus,Trash2, Edit3} from "@tamagui/lucide-icons";
import {CreateWishlistDialogButton} from "./components/CreateWishlistDialogButton";
import {EditWishlistDialogButton} from "./components/EditWishlistDialogButton";
import {DeleteWishlistAlertDialogButton} from "./components/DeleteWishlistAlertDialogButton";

interface ManageWishlistsScreenProps {
  Edit3: unknown
}

export default function ManageWishlistsScreen() {
  const { wishlists, createWishlist, deleteWishlist, updateWishlistById} = useWishlists();
  const navigation = useNavigation();
  
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

  return (
    <View style={{flex: 1}}>
      <ScrollView stickyHeaderIndices={[0]}>
        <View>
          <YStack width={"100%"} gap={"$2"} style={{padding: 20}}>
            {
              wishlists.map(wishlist => (
                <XStack key={wishlist.id} width={"100%"} justifyContent={"space-between"} backgroundColor={"$black2"} paddingVertical={"$2"} borderRadius={"$3"}>
                  <Label paddingLeft={"$4"}>
                    {wishlist.name}
                  </Label>
                  <XStack paddingRight={"$3"}>
                    <EditWishlistDialogButton Wishlist={wishlist}/>
                    <DeleteWishlistAlertDialogButton/>
                  </XStack>
                </XStack>
              ))
            }
          </YStack>
        </View>
      </ScrollView>
      <CreateWishlistDialogButton/>
    </View>
  );

}
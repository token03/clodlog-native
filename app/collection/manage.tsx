import React, {useEffect, useMemo} from "react";
import {H6, Label, ScrollView, View, XStack} from 'tamagui';
import {useCollections} from "../../contexts/CollectionContext";
import {useNavigation} from "expo-router";
import {CreateCollectionDialogButton} from "./components/CreateCollectionDialogButton";
import {EditCollectionDialogButton} from "./components/EditCollectionDialogButton";
import {DeleteCollectionAlertDialogButton} from "./components/DeleteCollectionAlertDialogButton";
import {DndProvider, Draggable, DraggableStack, UniqueIdentifier} from "@mgcrea/react-native-dnd";

export default function ManageCollectionsScreen() {
  const { itemsRecord: collectionRecord, itemOrder: collectionOrder, updateItemOrder: updateCollectionOrder } = useCollections();
  const navigation = useNavigation();

  // Memoize the ordered collections array
  const orderedCollections = useMemo(() => {
    return collectionOrder
      .map(id => collectionRecord[id])
      .filter(Boolean); // Remove any undefined entries
  }, [collectionOrder, collectionRecord]);

  useEffect(() => {
    navigation.setOptions({
      title: "Edit Collections",
      headerTitle: () => (
        <XStack
          alignContent={"center"}
          justifyContent={"space-between"}
          width={"78vw"}
        >
          <H6>Edit Collections</H6>
        </XStack>
      )
    });
  }, [navigation]);

  const onStackOrderChange = (orderedIds: UniqueIdentifier[]) => {
    updateCollectionOrder(orderedIds as string[]);
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
              {orderedCollections.map(collection => (
                <Draggable key={collection.id} id={collection.id} activationTolerance={2}>
                  <XStack width={"100%"} justifyContent={"space-between"} backgroundColor={"$black2"} paddingVertical={"$2"} borderRadius={"$3"}>
                    <Label paddingLeft={"$4"}>
                      {collection.name}
                    </Label>
                    <XStack paddingRight={"$3"}>
                      <EditCollectionDialogButton Collection={collection}/>
                      <DeleteCollectionAlertDialogButton Collection={collection}/>
                    </XStack>
                  </XStack>
                </Draggable>
              ))}
            </DraggableStack>
          </DndProvider>
        </View>
      </ScrollView>
      <CreateCollectionDialogButton/>
    </View>
  );
}

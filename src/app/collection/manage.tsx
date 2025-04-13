import { useCallback, useEffect, useState } from "react";
import { Label, ScrollView, View, XStack } from "tamagui";
import { useCollections } from "@/contexts/CollectionContext";
import { useNavigation } from "expo-router";
import {
  CreateCollectionDialogButton,
  EditCollectionDialogButton,
  DeleteCollectionAlertDialogButton,
} from "@/components/Collection";
import {
  DndProvider,
  Draggable,
  DraggableStack,
  UniqueIdentifier,
} from "@mgcrea/react-native-dnd";
import { Collection } from "@/types/interfaces/collection";
import { ScreenHeader } from "@/components/ScreenHeader";

export default function ManageCollectionsScreen() {
  const { items: initialCollection, updateItemOrder: updateCollectionOrder } =
    useCollections();
  const [renderedCollections, setRenderedCollections] =
    useState(initialCollection);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigation = useNavigation();

  const refreshScreen = useCallback(() => {
    setRefreshKey((prevKey) => prevKey + 1);
  }, []);

  const afterEditCollection = useCallback((id: string, name: string) => {
    setRenderedCollections((prevCollections) =>
      prevCollections.map((collection) =>
        collection.id === id ? { ...collection, name } : collection
      )
    );
  }, []);

  const afterDeleteCollection = useCallback(
    (id: string) => {
      setRenderedCollections((prevCollections) =>
        prevCollections.filter((collection) => collection.id !== id)
      );
      refreshScreen();
    },
    [refreshScreen]
  );

  const afterCreateCollection = useCallback(
    (collection: Collection) => {
      setRenderedCollections((prevCollections) => [
        ...prevCollections,
        collection,
      ]);
      refreshScreen();
    },
    [refreshScreen]
  );

  useEffect(() => {
    navigation.setOptions({
      title: "Edit Collections",
      headerTitle: () => <ScreenHeader title={"Edit Collections"} />,
    });
  }, [navigation]);

  const onStackOrderChange = async (orderedIds: UniqueIdentifier[]) => {
    await updateCollectionOrder(orderedIds as string[]);
  };

  return (
    <View style={{ flex: 1 }} key={refreshKey}>
      <ScrollView>
        <View height={"100%"}>
          <DndProvider>
            <DraggableStack
              direction="column"
              onOrderChange={onStackOrderChange}
              gap={10}
              style={{ padding: 10 }}
            >
              {renderedCollections.map((collection) => (
                <Draggable
                  key={collection.id}
                  id={collection.id}
                  activationTolerance={0}
                >
                  <XStack
                    width={"100%"}
                    justifyContent={"space-between"}
                    backgroundColor={"$black2"}
                    paddingVertical={"$2"}
                    borderRadius={"$3"}
                  >
                    <Label paddingLeft={"$4"}>{collection.name}</Label>
                    <XStack paddingRight={"$3"}>
                      <EditCollectionDialogButton
                        Collection={collection}
                        afterEdit={afterEditCollection}
                      />
                      <DeleteCollectionAlertDialogButton
                        Collection={collection}
                        afterDelete={afterDeleteCollection}
                      />
                    </XStack>
                  </XStack>
                </Draggable>
              ))}
            </DraggableStack>
          </DndProvider>
        </View>
      </ScrollView>
      <CreateCollectionDialogButton afterCreate={afterCreateCollection} />
    </View>
  );
}

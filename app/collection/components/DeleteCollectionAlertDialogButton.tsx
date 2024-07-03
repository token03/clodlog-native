import {
  AlertDialog,
  Button,
  Paragraph,
  PopoverProps,
  XStack,
  YStack,
} from "tamagui";
import {Edit3, Plus, Trash2, X} from "@tamagui/lucide-icons";
import {useCollections} from "../../../contexts/CollectionContext";
import {Collection} from "../../../types/interfaces/collection";

export function DeleteCollectionAlertDialogButton({ Collection }: PopoverProps & { Collection: Collection }) {
  const { deleteItem: deleteCollection } = useCollections();

  const handleDeleteCollection = async () => {
    deleteCollection(Collection.id)
  }


  return (
    <AlertDialog native>
      <AlertDialog.Trigger asChild>
        <Button chromeless padding={"$3"} icon={Trash2}/>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          borderWidth={0}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          width={"90%"}
          gap={"$3"}
          backgroundColor={"$black2"}

        >
          <YStack gap={"$3"}>
            <AlertDialog.Title size={"$7"}>Delete Collection</AlertDialog.Title>
            <AlertDialog.Description>
              <YStack>
                <Paragraph size={"$3"}>
                  Are you sure you want to delete this collection? 
                </Paragraph>
                <Paragraph size={"$3"}>
                  <strong>This action cannot be undone.</strong>
                </Paragraph>
              </YStack>
            </AlertDialog.Description>

            <XStack gap="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild>
                <Button size={"$3"}>Cancel</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild onPress={handleDeleteCollection}>
                <Button size={"$3"} theme="active">Accept</Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>

  );
}

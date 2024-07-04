import {
  Button,
  Checkbox,
  CheckedState,
  Dialog,
  Fieldset,
  Label,
  Paragraph,
  PopoverProps,
  Unspaced,
  XStack,
  YStack,
} from "tamagui";
import {useCollections} from "../../contexts/CollectionContext";
import {useState} from "react";
import {useRouter} from "expo-router";
import {Card} from "../../classes/card";
import {BookOpen, Check, LibrarySquare, X} from "@tamagui/lucide-icons";

export function CollectionDialogButton({ Icon, Name, Card, ...props }: PopoverProps & { Icon?: any; Name?: string; Card?: Card }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { items: collections, addCardToItem: addCardToCollection, removeCardFromItem: removeCardFromCollection} = useCollections();
  const router= useRouter();
  const isCardInCollection = Object.values(collections).some(collection => collection.cards.some(card => card.id === Card?.id));
  
  const handlePressEdit = () => {
    router.push(`/collection/manage/`);
  };

  const handleCheckboxChange = async (id: string, checked: CheckedState) => {
    if (checked === true && Card !== undefined) {
      addCardToCollection(id, Card);
    } else if (checked === false && Card !== undefined) {
      removeCardFromCollection(id, Card?.id);
    }
  };

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button
          icon={
            <BookOpen
              fill={isCardInCollection ? "white" : undefined}
              color={"grey"}
              strokeWidth={2}
            />
          }
          scaleIcon={2}
          size={"$1.5"}
          chromeless
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
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
          <Dialog.Title size={"$7"}>Collections</Dialog.Title>
          <YStack maxHeight={"50vh"} overflow={"scroll"}>
            {Object.values(collections).map(collection => (
              <Fieldset key={collection.id} horizontal borderWidth={0} gap={"$3"}>
                <Checkbox
                  id={collection.id}
                  size={"$4"}
                  checked={collection.cards.some(card => card.id === Card?.id) || false}
                  onCheckedChange={(checked) => handleCheckboxChange(collection.id, checked)}
                >
                  <Checkbox.Indicator>
                    <Check />
                  </Checkbox.Indicator>
                </Checkbox>
                <Label justifyContent="flex-start" htmlFor={collection.id} flex={1}>
                  <Paragraph>{collection.name}</Paragraph>
              </Label>
              </Fieldset>
            ))}
          </YStack>
          
          <XStack justifyContent={"space-between"} gap={"$3"}>
            <Dialog.Close displayWhenAdapted asChild>
              <Button size={"$3"} chromeless onPress={handlePressEdit}>
                Edit
              </Button>
            </Dialog.Close>
            <Dialog.Close displayWhenAdapted asChild>
              <XStack gap={"$3"}>
                <Button size={"$3"} chromeless>
                  Cancel
                </Button>
                <Button size={"$3"} theme="active" aria-label="Close">
                  Save
                </Button>
              </XStack>
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
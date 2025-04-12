import {Button, Dialog, Fieldset, Input, Label, PopoverProps, Unspaced, XStack, YStack,} from "tamagui";
import {Edit3, Plus, X} from "@tamagui/lucide-icons";
import {useCollections} from "../../../contexts/CollectionContext";
import {useEffect, useState} from "react";
import {Collection} from "../../../types/interfaces/collection";

export function EditCollectionDialogButton({ Collection, afterEdit, ...props }: PopoverProps & { Collection: Collection, afterEdit?: (id: string, name: string) => void }) {
  const { items: collections, updateItem: updateCollectionById } = useCollections();
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState(true);

  const checkExistingNameInCollection = (name: string) => {
    return collections.some(collection => collection.name === name);
  }

  useEffect(() => {
    setIsValid(!checkExistingNameInCollection(name));
  }, [name]);

  const handleEditCollection = async (name: string) => {
    if (isValid) {
      await updateCollectionById(Collection.id, { ...Collection, name })
      afterEdit && afterEdit(Collection.id, name);
    }
  }

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button chromeless padding={"$3"} icon={Edit3}/>
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
          <Dialog.Title size={"$7"}>Edit Collection</Dialog.Title>
          <YStack>
            <Fieldset horizontal borderWidth={0} gap={"$3"}>
              <Label>
                Name:
              </Label>
              <Input size={"$3"}
                     onChangeText={setName}
                     defaultValue={Collection.name}
                     style={{
                       borderColor: isValid ? undefined : '#ff5050',
                       color: isValid ? undefined : '#ff9999'
                     }}
              />
            </Fieldset>
          </YStack>

          <XStack justifyContent={"flex-end"} gap={"$3"}>
            <Dialog.Close displayWhenAdapted asChild>
              <Button size={"$3"} chromeless>
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close displayWhenAdapted asChild>
              <Button size={"$3"}
                      theme="active"
                      aria-label="Close"
                      disabled={!isValid}
                      onPress={() => handleEditCollection(name)}
              >
                Edit
              </Button>
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

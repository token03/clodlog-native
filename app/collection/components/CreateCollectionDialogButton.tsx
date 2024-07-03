import {Button, Dialog, Fieldset, Input, Label, PopoverProps, Unspaced, XStack, YStack,} from "tamagui";
import {Plus, X} from "@tamagui/lucide-icons";
import {useCollections} from "../../../contexts/CollectionContext";
import {useEffect, useState} from "react";

export function CreateCollectionDialogButton(props: PopoverProps) {
  const { items: collections, createItem: createCollection } = useCollections();
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState(true);

  const checkExistingNameInCollection = (name: string) => {
    return collections.some(collection => collection.name === name);
  }

  useEffect(() => {
    setIsValid(!checkExistingNameInCollection(name));
  }, [name]);

  const handleCreateCollection = async (name: string) => {
    if (isValid) {
      createCollection(name);
    }
  }


  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button size={"$3"} style={{position: "absolute", padding: 15, right: 20, bottom: 20}}>
          <Plus size={"$1"}/>
          Add Collection
        </Button>
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
          <Dialog.Title size={"$7"}>Create Collection</Dialog.Title>
          <YStack>
            <Fieldset horizontal borderWidth={0} gap={"$3"}>
              <Label>
                Name:
              </Label>
              <Input size={"$3"} 
                     onChangeText={setName} 
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
                      onPress={() => handleCreateCollection(name)}
              >
                Add
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

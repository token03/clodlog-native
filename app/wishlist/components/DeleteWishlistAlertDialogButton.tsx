import {
  AlertDialog,
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  Paragraph,
  PopoverProps,
  Unspaced,
  XStack,
  YStack,
} from "tamagui";
import {Edit3, Plus, Trash2, X} from "@tamagui/lucide-icons";
import {CardResume} from "@tcgdex/sdk";
import {useWishlists} from "../../../contexts/WishlistContext";
import {useEffect, useState} from "react";
import {createWishlist} from "../../../services/wishlistService";

export function DeleteWishlistAlertDialogButton({ Icon, Name, Card, ...props }: PopoverProps & { Icon?: any; Name?: string; Card?: CardResume }) {
  const { wishlists, createWishlist } = useWishlists();
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState(true);

  const checkExistingNameInWishlist = (name: string) => {
    return wishlists.some(wishlist => wishlist.name === name);
  }

  useEffect(() => {
    setIsValid(!checkExistingNameInWishlist(name));
  }, [name]);

  const handleCreateWishlist = async (name: string) => {
    if (isValid) {
      createWishlist(name);
    }
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
            <AlertDialog.Title size={"$7"}>Delete Wishlist</AlertDialog.Title>
            <AlertDialog.Description>
              <YStack>
                <Paragraph size={"$3"}>
                  Are you sure you want to delete this wishlist? 
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
              <AlertDialog.Action asChild>
                <Button size={"$3"} theme="active">Accept</Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>

  );
}

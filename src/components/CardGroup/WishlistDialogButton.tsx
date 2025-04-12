import {
  Button,
  Checkbox,
  CheckedState,
  Dialog,
  Fieldset,
  Label,
  Paragraph,
  XStack,
  YStack,
  Unspaced, PopoverProps, Input, Switch,
} from "tamagui";
import {Check, Edit3, Heart, Plus, Star, Trash, Trash2, X} from "@tamagui/lucide-icons";
import {useWishlists, WishlistProvider} from "../../contexts/WishlistContext";
import {useState} from "react";
import {useRouter} from "expo-router";
import {Card} from "../../types/classes/card";

export function WishlistDialogButton({ Icon, Name, Card, ...props }: PopoverProps & { Icon?: any; Name?: string; Card?: Card }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { items: wishlists, addCardToItem: addCardToWishlist, removeCardFromItem: removeCardFromWishlist} = useWishlists();
  const router= useRouter();
  const isCardInWishlist = Object.values(wishlists).some(wishlist => wishlist.cards.some(card => card.id === Card?.id));
  
  const handlePressEdit = () => {
    router.push(`/wishlist/manage/`);
  };

  const handleCheckboxChange = async (id: string, checked: CheckedState) => {
    if (checked === true && Card !== undefined) {
      addCardToWishlist(id, Card);
    } else if (checked === false && Card !== undefined) {
      removeCardFromWishlist(id, Card?.id);
    }
  };

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button
          icon={
            <Star
              fill={isCardInWishlist ? "white" : undefined}
              opacity={isCardInWishlist ? 0.7 : 1}
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
          <Dialog.Title size={"$7"}>Wishlists</Dialog.Title>
          <YStack maxHeight={"50vh"} overflow={"scroll"}>
            {Object.values(wishlists).map(wishlist => (
              <Fieldset key={wishlist.id} horizontal borderWidth={0} gap={"$3"}>
                <Checkbox
                  id={wishlist.id}
                  size={"$4"}
                  checked={wishlist.cards.some(card => card.id === Card?.id) || false}
                  onCheckedChange={(checked) => handleCheckboxChange(wishlist.id, checked)}
                >
                  <Checkbox.Indicator>
                    <Check />
                  </Checkbox.Indicator>
                </Checkbox>
                <Label justifyContent="flex-start" htmlFor={wishlist.id} flex={1}>
                  <Paragraph>{wishlist.name}</Paragraph>
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
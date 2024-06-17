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
  Unspaced, PopoverProps,
} from "tamagui";
import { Check, Heart, X } from "@tamagui/lucide-icons";
import { CardResume } from "@tcgdex/sdk";
import {useWishlists, WishlistProvider} from "../../contexts/WishlistContext";

export function WishlistDialogButton({ Icon, Name, Card, ...props }: PopoverProps & { Icon?: any; Name?: string; Card?: CardResume }) {
  const { wishlists, addCardToWishlist, removeCardFromWishlist} = useWishlists();
  const isCardInWishlist = Object.values(wishlists).some(wishlist => wishlist.cards.some(card => card.id === Card?.id));

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
            <Heart
              fill={isCardInWishlist ? "#e34439" : undefined}
              strokeWidth={isCardInWishlist ? 0 : 2}
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
          <YStack>
            {Object.values(wishlists).map(wishlist => (
              <Fieldset key={wishlist.id} horizontal justifyContent={"space-between"} borderWidth={0}>
                <Label justifyContent="flex-start" htmlFor={wishlist.id} flex={1}>
                  <Paragraph>{wishlist.name}</Paragraph>
                </Label>
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
              </Fieldset>
            ))}
          </YStack>

          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button size={"$3"} theme="active" aria-label="Close">
                Save
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
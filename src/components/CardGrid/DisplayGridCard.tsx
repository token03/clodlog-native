import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable } from 'react-native';
import { Card } from '@/types/classes/card';
import { View, XStack } from 'tamagui';
import { Bookmark } from '@tamagui/lucide-icons';
import { SMALL_CARD_HEIGHT, SMALL_CARD_WIDTH } from '@/constants/DisplayCards';

type DisplayGridCardProps = {
  card: Card;
  route: string;
  isSelected: boolean;
  isInWishlist: boolean;
  isInCollection: boolean;
  selectCard: (card: Card) => void;
  deselectCard: (card: Card) => void;
  selectingMode: boolean;
};

export const DisplayGridCard = ({
  route,
  card,
  isInWishlist,
  isInCollection,
  isSelected,
  selectCard,
  deselectCard,
  selectingMode,
}: DisplayGridCardProps) => {
  const router = useRouter();
  const isWishlistOrCollectionGrid = route === 'wishlist' || route === 'collection';

  const handlePress = () => {
    if (selectingMode) {
      isSelected ? deselectCard(card) : selectCard(card);
      return;
    }
    router.push(`/${route}/card/`);
    router.setParams({ cardId: card.id });
  };

  const handleLongPress = () => {
    if (!isSelected) {
      selectCard(card);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      onLongPress={handleLongPress}
      style={{ flex: 1 }}
      pointerEvents={'box-only'}
    >
      <Image
        source={{
          uri: card?.images?.small,
          width: SMALL_CARD_WIDTH,
          height: SMALL_CARD_HEIGHT,
        }}
        placeholder={{ uri: '/assets/images/placeholder.png' }}
        style={{
          flex: 1,
        }}
        placeholderContentFit='cover'
        pointerEvents={'box-only'}
        contentFit='cover'
      />
      {isSelected && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(140, 216, 255, 0.3)',
            borderRadius: 10,
            zIndex: 1,
          }}
        />
      )}
      {!isWishlistOrCollectionGrid && (
        <XStack
          style={{
            position: 'absolute',
            top: -5,
            right: 2,
            zIndex: 3,
          }}
        >
          {(isInCollection || isInWishlist) && (
            <Bookmark
              fill={isInCollection && isInWishlist ? 'white' : isInWishlist ? 'red' : 'orange'}
              opacity={0.7}
              strokeWidth={0}
              size='$1'
            />
          )}
        </XStack>
      )}
    </Pressable>
  );
};

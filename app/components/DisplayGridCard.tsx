import {useRouter} from "expo-router";
import {Image} from "expo-image"
import {Pressable} from "react-native";
import {Card} from "../../classes/card";

type DisplayGridCardProps = {
  card: Card;
  route: string; 
  isHiRes?: boolean;
};

export const DisplayGridCard = ({ route, card, isHiRes = false }: DisplayGridCardProps) => {
  const router= useRouter();
  
  const handlePress = () => {
    router.push(`/${route}/card/`);
    router.setParams({ cardId: card.id });
  };

  return (
    <Pressable onPress={handlePress} style={{flex: 1}}>
      <Image
        source={{
          uri: card?.images?.small,
        }}
        placeholder={{ uri: '/assets/images/placeholder.png' }}
        style={{
          flex: 1,
        }}
        placeholderContentFit={"contain"}
        pointerEvents={"none"}
        contentFit={"contain"}
      />
    </Pressable>
  );
}
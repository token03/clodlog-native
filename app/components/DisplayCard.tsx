import {useRouter} from "expo-router";
import {CardResume} from "@tcgdex/sdk";
import {Image} from "expo-image"
import {createCardImageUrl} from "../../utils/imageUtils";
import {ImageExtension, ImageQuality} from "../../constants/enums/Image";
import {Pressable, TouchableOpacity} from "react-native";

type DisplayCardProps = {
  cardBrief: CardResume;
  route: string; 
  isHiRes?: boolean;
};

export const DisplayCard = ({ route, cardBrief, isHiRes = false }: DisplayCardProps) => {
  const router= useRouter();
  
  const handlePress = () => {
    router.push(`/${route}/card/`);
    router.setParams({ cardId: cardBrief.id });
  };

  return (
    <Pressable onPress={handlePress} style={{flex: 1}}>
      <Image
        source={{
          uri: createCardImageUrl(cardBrief.image, ImageQuality.LOW, ImageExtension.WEBP)
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
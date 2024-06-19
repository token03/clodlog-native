import {Card} from "@tcgdex/sdk";
import {Image} from "expo-image"
import {createCardImageUrl} from "../../utils/imageUtils";
import {ImageExtension, ImageQuality} from "../../constants/enums/Image";
import {View} from "tamagui";
import '../../styles/cards/cards.css'
import {Supertype} from "../../types/CardTypes";
import HolographicCard from "./HolographicCard";

type DisplayScreenCardProps = {
  card: Card | null;
  handlePress?: () => void;
};

export const DisplayScreenCard = ({ card, handlePress }: DisplayScreenCardProps) => {
  return (
    <View style={{height: '100%', flex: 1}}>
      <HolographicCard 
        supertype={card?.category as Supertype} 
        // rarity={cardRarityMapper[card?.rarity as string]}
        rarity={"common"}
        dataGallery={"false"} 
        style={{height: "100%", flex: 1}}
        children={
          <Image
            placeholder={{
              uri: '/assets/images/placeholder.png'
            }}
            source={
              {
                uri: createCardImageUrl(card?.image, ImageQuality.HIGH, ImageExtension.WEBP),
              }
            }
            style={{
              flex: 1,
              height: '100%',
            }}
            priority={"high"}
            pointerEvents={"none"}
            contentFit={"contain"}
            placeholderContentFit={"contain"}
            onTouchEndCapture={() => handlePress && handlePress()}
          />
        }
      />
    </View>
  );
}

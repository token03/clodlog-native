import {Image} from "expo-image"
import {View} from "tamagui";
import '../../styles/cards/cards.css'
import HolographicCard from "./HolographicCard";
import {Card} from "../../classes/card";
import {Supertype} from "../../types/supertype";

type DisplayScreenCardProps = {
  card: Card | null;
  handlePress?: () => void;
};

export const DisplayScreenCard = ({ card, handlePress }: DisplayScreenCardProps) => {
  return (
    <View style={{flex: 1}}>
      <HolographicCard 
        supertype={card?.supertype as Supertype} 
        // rarity={cardRarityMapper[card?.rarity as string]}
        rarity={"common"}
        // mask={"https://poke-holo.b-cdn.net/foils/swsh7/masks/upscaled/215_foil_etched_swsecret_2x.webp"}
        // foil={"https://poke-holo.b-cdn.net/foils/swsh7/foils/upscaled/215_foil_etched_swsecret_2x.webp"}
        isTrainerGallery={true} 
        children={
          <Image
            placeholder={{
              uri: '/assets/images/placeholder.png'
            }}
            source={
              {
                uri: card?.images?.large,
                width: 733,
                height: 1024,
              }
            }
            style={{
              flex: 1,
              height: '100%'
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

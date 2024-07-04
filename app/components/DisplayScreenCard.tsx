import {Image} from "expo-image"
import {View} from "tamagui";
import '../../styles/cards/cards.css'
import HolographicCard from "./HolographicCard";
import {Card} from "../../classes/card";
import {Supertype} from "../../types/supertype";
import {Rarity} from "../../types/rarity";
import {useEffect, useState} from "react";
import {HI_RES_CARD_HEIGHT, HI_RES_CARD_WIDTH} from "../../constants/DisplayCards";

type DisplayScreenCardProps = {
  card: Card | null;
  handlePress?: () => void;
};

export const DisplayScreenCard = ({ card, handlePress }: DisplayScreenCardProps) => {
  const [maskUrl, setMaskUrl] = useState<string>("");
  const [foilUrl, setFoilUrl] = useState<string>("");
  
  const IMAGE_CDN = process.env.EXPO_PUBLIC_IMAGE_CDN;

  useEffect(() => {
    if (!card) return;

    // TODO: this entire useEffect should be removed in favour of backend foil/mask url storage.
    const fetchImage = async (url: string) => {
      const response = await fetch(url);
      return response.ok ? url : '';
    };

    const getImageNumber = () => {
      const padSet = new Set(['swsh', 'pgo', 'cel25']);
      const shouldPad = [...padSet].some(prefix => card.set.id.startsWith(prefix)) && card.set.id !== 'cel25c';
      return shouldPad ? card.number.padStart(3, '0').toLowerCase() : card.number.toLowerCase();
    };

    const setId = card.set.id.replace(/^(swsh.*?)tg$/, '$1');
    const number = getImageNumber();
    const baseUrl = `${IMAGE_CDN}/images/${setId}`;
    
    Promise.all([
      fetchImage(`${baseUrl}/masks/upscaled/${number}.webp`),
      fetchImage(`${baseUrl}/foils/upscaled/${number}.webp`)
    ]).then(([maskUrl, foilUrl]) => {
      setMaskUrl(maskUrl);
      setFoilUrl(foilUrl);
    });
  }, [card]);


  const getRarity = (): string => {
    if (!card) return '';

    const rarityMap: { [key: string]: string } = {
      'shiny rare': 'rare shiny',
      'rare holo gx': 'rare holo v',
      'double rare': 'rare holo v',
      'rare holo ex': 'rare holo v',
      'illustration rare': 'rare holo v',
      'ultra rare': 'rare ultra',
      'shiny ultra rare': 'rare ultra',
      'rare break': 'rare secret',
      'hyper rare': 'rare secret',
      'legend': 'rare secret',
      'rare shining': 'rare shiny',
    };

    const rarity = card.rarity.toLowerCase();
    const hasMaskAndFoil = maskUrl && foilUrl;

    if (rarity === 'promo') {
      const prioritySubtypes = ['VMAX', 'VSTAR', 'V', 'GX', 'EX', 'ex'];
      const matchedSubtype = card.subtypes.find(subtype =>
        prioritySubtypes.includes(subtype.toUpperCase())
      );

      if (matchedSubtype) {
        return rarityMap[`rare holo ${matchedSubtype.toLowerCase()}`];
      }
      return hasMaskAndFoil ? (card.set.id.startsWith("sv") ? "rare holo v" : "rare holo") : '';
    }

    // TODO: add reverse rare support to backend and image server
    if (rarity === 'rare' && hasMaskAndFoil && card.set.id.startsWith('sv')) {
      return 'rare holo v';
    } 

    return rarityMap[rarity] || rarity;
  };
  
  const isTrainerGallery = () => {
    return !!card?.number.match(/^[tg]g/i) || card?.rarity.toLowerCase() === "special illustration rare";
  }
  
  if (!card) return null;

  return (
    <View style={{ flex: 1 }}>
      <HolographicCard
        supertype={card.supertype.toLowerCase()}
        rarity={getRarity()}
        subtypes={card.subtypes.join(' ').toLowerCase()}
        mask={maskUrl}
        foil={foilUrl}
        number={card.number}
        isTrainerGallery={isTrainerGallery()}
      >
        <Image
          placeholder={{ uri: '/assets/images/placeholder.png' }}
          source={{
            uri: card.images.large,
            width: HI_RES_CARD_WIDTH,
            height: HI_RES_CARD_HEIGHT,
          }}
          style={{ flex: 1 }}
          priority="high"
          contentFit="cover"
          placeholderContentFit="cover"
          onTouchEndCapture={handlePress}
        />
      </HolographicCard>
    </View>
  );

}

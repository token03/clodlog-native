import { Image } from 'expo-image';
import { View } from 'tamagui';
import '@/styles/cards/cards.css';
import HolographicCard from './HolographicCard';
import { SkiaCard } from './SkiaCard';
import { Card } from '@/types/classes/card';
import { useEffect, useState } from 'react';
import { HI_RES_CARD_HEIGHT, HI_RES_CARD_WIDTH } from '@/constants/DisplayCards';

type DisplayScreenCardProps = {
  card: Card | null;
  handlePress?: () => void;
  isHolographic: boolean;
  setScrollEnabled?: (scrollEnabled: boolean) => void;
};

const PLACEHOLDER_URI = '/assets/images/placeholder.png';

export const DisplayScreenCard = ({
  card,
  handlePress,
  isHolographic,
  setScrollEnabled,
}: DisplayScreenCardProps) => {
  const [maskUrl, setMaskUrl] = useState<string>('');
  const [foilUrl, setFoilUrl] = useState<string>('');

  const IMAGE_CDN = process.env.EXPO_PUBLIC_IMAGE_CDN;

  useEffect(() => {
    setMaskUrl('');
    setFoilUrl('');
    if (!card) return;

    const fetchImage = async (url: string): Promise<string> => {
      try {
        // Prefer HEAD to check existence quickly and save bandwidth
        const headResponse = await fetch(url, { method: 'HEAD' });
        if (headResponse.ok) {
          return url;
        }
        console.warn(`HEAD request failed or non-OK for ${url}: ${headResponse.status}`);
        const getResponse = await fetch(url);
        return getResponse.ok ? url : '';
      } catch (e) {
        console.error(`Failed to fetch image URL ${url}:`, e);
        return '';
      }
    };

    const getImageNumber = () => {
      const padSet = new Set(['swsh', 'pgo', 'cel25']);
      const shouldPad =
        [...padSet].some(prefix => card.set.id.startsWith(prefix)) && card.set.id !== 'cel25c';
      return shouldPad ? card.number.padStart(3, '0').toLowerCase() : card.number.toLowerCase();
    };

    const setId = card.set.id.replace(/^(swsh.*?)tg$/, '$1');
    const number = getImageNumber();
    const baseUrl = `${IMAGE_CDN}/${setId}`;

    Promise.all([
      fetchImage(`${baseUrl}/masks/upscaled/${number}.webp`),
      fetchImage(`${baseUrl}/foils/upscaled/${number}.webp`),
    ]).then(([fetchedMaskUrl, fetchedFoilUrl]) => {
      setMaskUrl(fetchedMaskUrl);
      setFoilUrl(fetchedFoilUrl);
    });
  }, [card, IMAGE_CDN]);

  const getRarity = (): string => {
    if (!card) return '';

    const rarityMap: { [key: string]: string } = {
      'shiny rare': 'rare shiny',
      'rare holo gx': 'rare holo v',
      'rare prime': 'rare holo',
      'double rare': 'rare holo v',
      'rare holo ex': 'rare holo v',
      'illustration rare': 'rare holo v',
      'ultra rare': 'rare ultra',
      'shiny ultra rare': 'rare ultra',
      'rare break': 'rare secret',
      'hyper rare': 'rare secret',
      legend: 'rare secret',
      'rare shining': 'rare shiny',
      'special illustration rare': 'special illustration rare',
    };

    const rarity = card.rarity.toLowerCase();
    const hasEffects = maskUrl || foilUrl;

    if (rarity === 'promo') {
      const prioritySubtypes = ['VMAX', 'VSTAR', 'V', 'GX', 'EX', 'ex'];
      const matchedSubtype = card.subtypes.find(subtype =>
        prioritySubtypes.includes(subtype.toUpperCase())
      );
      if (matchedSubtype) {
        const holoType = `rare holo ${matchedSubtype.toLowerCase()}`;
        return rarityMap[holoType] || holoType;
      }
      return hasEffects ? (card.set.id.startsWith('sv') ? 'rare holo v' : 'rare holo') : 'promo';
    }

    if (rarity === 'rare' && hasEffects) {
      return card.set.id.startsWith('sv') ? 'rare holo v' : 'rare holo';
    }

    return rarityMap[rarity] || rarity;
  };

  const isTrainerGallery = (): boolean => {
    if (!card) return false;
    return (
      !!card.number.match(/^[tg]g/i) || card.rarity.toLowerCase() === 'special illustration rare'
    );
  };

  if (!card) return null;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isHolographic ? (
        <HolographicCard
          supertype={card.supertype.toLowerCase()}
          rarity={getRarity()}
          subtypes={card.subtypes.join(' ').toLowerCase()}
          mask={maskUrl}
          foil={foilUrl}
          number={card.number}
          isTrainerGallery={isTrainerGallery()}
          setScrollEnabled={setScrollEnabled}
          style={{ width: HI_RES_CARD_WIDTH / 2.5, height: HI_RES_CARD_HEIGHT / 2.5 }}
        >
          <Image
            placeholder={{ uri: PLACEHOLDER_URI }}
            source={{ uri: card.images.large }}
            style={{ flex: 1, width: '100%', height: '100%' }}
            priority='high'
            contentFit='cover'
            placeholderContentFit='cover'
            onTouchEndCapture={handlePress}
          />
        </HolographicCard>
      ) : (
        <SkiaCard
          imageUrl={card.images.large}
          maskUrl={maskUrl}
          width={HI_RES_CARD_WIDTH / 2.5}
          height={HI_RES_CARD_HEIGHT / 2.5}
          handlePress={handlePress}
          setScrollEnabled={setScrollEnabled}
        />
      )}
    </View>
  );
};

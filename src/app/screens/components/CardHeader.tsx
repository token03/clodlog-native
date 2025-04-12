import React from 'react';
import { XStack, YStack, H5, H6, Paragraph } from 'tamagui';
import {Card} from "../../../types/classes/card";

type CardHeaderProps = {
  card: Card | null;
};

export const CardHeader: React.FC<CardHeaderProps> = ({ card }) => (
  <YStack width="100%">
    <XStack justifyContent="space-between">
      <H5>{card?.name}</H5>
    </XStack>
    <XStack justifyContent="space-between">
      <Paragraph size="$1" alignContent="center">
        {card?.rarity} · {card?.supertype}
      </Paragraph>
      <Paragraph size="$1" alignContent="center">
        {card?.artist}
      </Paragraph>
    </XStack>
  </YStack>
);

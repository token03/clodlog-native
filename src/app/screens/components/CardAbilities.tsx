import React from 'react';
import { YStack, XStack, Paragraph } from 'tamagui';
import {Card} from "@/types/classes/card";

type CardAbilitiesProps = {
  card: Card | null;
};

export const CardAbilities: React.FC<CardAbilitiesProps> = ({ card }) => (
  <YStack width="100%" gap="$2">
    {card?.abilities?.map((ability, index) => (
      <YStack key={index} gap="$2">
        <XStack justifyContent="space-between">
          <Paragraph size="$2">Ability - {ability.name}</Paragraph>
        </XStack>
        <Paragraph size="$1">{ability.text}</Paragraph>
      </YStack>
    ))}
  </YStack>
);

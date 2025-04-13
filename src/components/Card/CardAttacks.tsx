import React from 'react';
import { YStack, XStack, Paragraph } from 'tamagui';
import { Card } from '@/types/classes/card';
import { EnergyIcon } from '@/components/EnergyIcon';

type CardAttacksProps = {
  card: Card | null;
};

export const CardAttacks: React.FC<CardAttacksProps> = ({ card }) => (
  <YStack width='100%' gap='$2'>
    {card?.attacks?.map((attack, index) => (
      <YStack key={index} gap='$2'>
        <XStack justifyContent='space-between'>
          <XStack gap='$2'>
            <Paragraph size='$2'>{attack.name}</Paragraph>
            {attack.cost && (
              <XStack gap='$1'>
                {attack.cost.map((cost, index) => (
                  <EnergyIcon type={cost} key={index} />
                ))}
              </XStack>
            )}
          </XStack>
          <Paragraph size='$2'>{attack.damage}</Paragraph>
        </XStack>
        <Paragraph size='$1'>{attack.text}</Paragraph>
      </YStack>
    ))}
  </YStack>
);

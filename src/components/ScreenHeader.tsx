import React from 'react';
import { XStack, H6 } from 'tamagui';

interface ScreenHeaderProps {
  title: string;
  additionalButtons?: React.ReactNode;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, additionalButtons }) => (
  <XStack alignContent='center' justifyContent='space-between' width='78vw'>
    <H6>{title}</H6>
    {additionalButtons}
  </XStack>
);

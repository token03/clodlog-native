import React from 'react';
import {YStack, H6, H1} from "tamagui";

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

export const SettingSection: React.FC<SettingSectionProps> = ({ title, children }) => (
  <YStack gap="$3">
    <H6 size="$3">{title}</H6>
    {children}
  </YStack>
);
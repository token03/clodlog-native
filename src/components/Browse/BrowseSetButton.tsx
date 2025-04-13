import { Button, ButtonText, XStack } from 'tamagui';
import { Image } from 'expo-image';
import React from 'react';
import { useRouter } from 'expo-router';
import { Set } from '@/types/classes/set';

interface BrowseSetButtonProps {
  set: Set;
}

const buttonProps = {
  chromeless: true,
  size: '$4',
  width: '100vw',
  borderRadius: 0,
  borderBottomColor: '$black3',
};

export const BrowseSetButton = ({ set }: BrowseSetButtonProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/browse/set/`);
    router.setParams({ setId: set.id });
  };

  return (
    <Button {...buttonProps} onPress={handlePress}>
      <XStack justifyContent={'space-between'} width={'100%'}>
        <Image
          style={{
            flex: 1,
            maxWidth: 70,
          }}
          source={{
            uri: set.images.logo,
          }}
          contentFit={'contain'}
        />

        <ButtonText>{set.name}</ButtonText>
      </XStack>
    </Button>
  );
};

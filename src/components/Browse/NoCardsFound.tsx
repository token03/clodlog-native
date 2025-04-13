import { Paragraph, YStack } from 'tamagui';
import { Image } from 'tamagui';

export const NoCardsFound = () => {
    return (
        <YStack flex={1} width='100%' justifyContent='center' alignItems='center'>
            <Image
                source={{
                    uri: '/assets/images/404.png',
                }}
                width={'100%'}
                height={'80vw'}
            />
            <Paragraph>Couldn't find any cards</Paragraph>
        </YStack>
    );
};

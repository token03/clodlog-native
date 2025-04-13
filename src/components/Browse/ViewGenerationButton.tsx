import { Button, Paragraph, XStack } from 'tamagui';
import React from 'react';
import { useRouter } from 'expo-router';
import { Library } from '@tamagui/lucide-icons';

interface ViewGenerationButtonProps {
    seriesName: string;
    handleViewSeries: (seriesName: string) => void;
}

const buttonProps = {
    chromeless: true,
    size: '$4',
    width: '100vw',
    borderRadius: 0,
    borderBottomColor: '$black3',
};

export const ViewGenerationButton = ({
    seriesName,
    handleViewSeries,
}: ViewGenerationButtonProps) => {
    const handlePress = () => {
        handleViewSeries(seriesName);
    };

    return (
        <Button {...buttonProps} onPress={handlePress}>
            <XStack justifyContent={'flex-end'} width={'100%'} gap={'$3'}>
                <Paragraph>View All</Paragraph>
                <Library size={'$1'} />
            </XStack>
        </Button>
    );
};

import React from 'react';
import { Image } from 'tamagui';

type EnergyIconProps = {
    type: string;
    height?: string | number;
    width?: string | number;
};

export const EnergyIcon: React.FC<EnergyIconProps> = ({ type, height = 12, width = 12 }) => {
    const svgPath = `/assets/svgs/${type.toLowerCase()}.svg`;

    return (
        <Image
            source={{
                uri: svgPath,
            }}
            width={width}
            height={height}
            resizeMethod={'scale'}
            alignSelf={'center'}
        />
    );
};

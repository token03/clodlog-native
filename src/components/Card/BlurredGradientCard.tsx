import {BlurView} from "expo-blur";
import {Image} from "expo-image";
import {LinearGradient} from "tamagui/linear-gradient";
import React from "react";

interface BlurredGradientCardProps {
  img?: string;
}

export const BlurredGradientCard: React.FC<BlurredGradientCardProps> = ({ img }) => {
  return (
    <>
      <BlurView style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, overflow: 'hidden'}}>
        <Image
          source={{uri: img}}
          style={{
            flex: 1,
            width: '100%',
            height: '110%',
            marginTop: '-33%',
            marginBottom: '-10%',
            resizeMode: 'cover',
          }}
          blurRadius={3}
        />
      </BlurView>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.85)', 'rgba(0, 0, 0, 1)']}
        style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
        locations={[0, 0.35, 0.8]}
      />
    </>
  )
}
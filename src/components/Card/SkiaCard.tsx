import React from 'react';
import { useWindowDimensions, View, StyleSheet } from 'react-native';
import { runOnJS } from 'react-native-reanimated';

import { GestureContainer } from './GestureContainer';
import { ImageCanvas } from './ImageCanvas';

export function PokemonCard() {
  const { width: SCREEN_WIDTH, height } = useWindowDimensions();
  const WIDTH = SCREEN_WIDTH * 0.9;
  const HEIGHT = WIDTH * 1.4;
  const MAX_ANGLE = 10;

  const [gradientCenter, setGradientCenter] = React.useState({
    x: WIDTH / 2,
    y: HEIGHT / 2,
  });

  const handleRotationChange = React.useCallback(
    (rx: number, ry: number) => {
      'worklet';
      runOnJS(setGradientCenter)({
        x: WIDTH / 2 + (WIDTH / 2) * (ry / MAX_ANGLE),
        y: HEIGHT / 2 + (HEIGHT / 2) * (rx / MAX_ANGLE),
      });
    },
    [HEIGHT, WIDTH]
  );

  return (
    <View
      style={[
        styles.centeredView,
        {
          width: SCREEN_WIDTH,
          height,
        },
      ]}
    >
      <GestureContainer
        width={WIDTH}
        height={HEIGHT}
        maxAngle={MAX_ANGLE}
        onRotationChange={handleRotationChange}
      >
        <ImageCanvas width={WIDTH} height={HEIGHT} gradientCenter={gradientCenter} />
      </GestureContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

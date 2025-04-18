import React from 'react';
import { StyleSheet, View } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { GestureContainer } from './GestureContainer';
import { ImageCanvas } from './ImageCanvas';

interface SkiaCardProps {
  imageUrl: string | null;
  maskUrl?: string | null;
  width: number;
  height: number;
  handlePress?: () => void;
  setScrollEnabled?: (enabled: boolean) => void;
}

const MAX_ANGLE = 10;

export function SkiaCard({
  imageUrl,
  maskUrl,
  width,
  height,
  handlePress,
  setScrollEnabled,
}: SkiaCardProps) {
  const [gradientCenter, setGradientCenter] = React.useState({
    x: width / 2,
    y: height / 2,
  });

  const handleRotationChange = React.useCallback(
    (rx: number, ry: number) => {
      'worklet';
      const clampedRy = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, ry));
      const clampedRx = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, rx));
      const newX = width / 2 + (width / 2) * (clampedRy / MAX_ANGLE);
      const newY = height / 2 + (height / 2) * (clampedRx / MAX_ANGLE);
      runOnJS(setGradientCenter)({ x: newX, y: newY });
    },
    [height, width]
  );

  const tapGesture = Gesture.Tap()
    .maxDuration(250)
    .onEnd((_event, success) => {
      if (success && handlePress) {
        runOnJS(handlePress)();
      }
    });

  const onGestureStart = React.useCallback(() => {
    'worklet';
    if (setScrollEnabled) {
      runOnJS(setScrollEnabled)(false);
    }
  }, [setScrollEnabled]);

  const onGestureEnd = React.useCallback(() => {
    'worklet';
    runOnJS(setGradientCenter)({ x: width / 2, y: height / 2 });
    if (setScrollEnabled) {
      setTimeout(() => runOnJS(setScrollEnabled)(true), 100);
    }
  }, [setScrollEnabled, width, height]);

  return (
    <GestureDetector gesture={tapGesture}>
      <View style={{ width, height }}>
        <GestureContainer
          width={width}
          height={height}
          maxAngle={MAX_ANGLE}
          onGestureStart={onGestureStart}
          onGestureEnd={onGestureEnd}
        >
          <ImageCanvas
            width={width}
            height={height}
            gradientCenter={gradientCenter}
            imageUrl={imageUrl}
            maskUrl={maskUrl}
          />
        </GestureContainer>
      </View>
    </GestureDetector>
  );
}

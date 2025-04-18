import React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedReaction,
} from 'react-native-reanimated';

interface GestureContainerProps {
  children: React.ReactNode;
  width: number;
  height: number;
  maxAngle?: number; // Made optional with default value
  onRotationChange?: (rx: number, ry: number) => void;
}

export function GestureContainer({
  children,
  width,
  height,
  maxAngle = 10, // Default value of 10
  onRotationChange,
}: GestureContainerProps) {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  // Move interpolateRotation inside component to use maxAngle prop
  const interpolateRotation = React.useCallback(
    (value: number, size: number, isReverse = false) => {
      'worklet';
      return interpolate(
        value,
        [0, size],
        isReverse ? [maxAngle, -maxAngle] : [-maxAngle, maxAngle],
        Extrapolation.CLAMP
      );
    },
    [maxAngle]
  );

  useAnimatedReaction(
    () => ({ x: rotateX.value, y: rotateY.value }),
    (current, previous) => {
      if (current !== previous && onRotationChange) {
        onRotationChange(current.x, current.y);
      }
    }
  );

  const gesture = Gesture.Pan()
    .onBegin(event => {
      rotateX.value = withTiming(interpolateRotation(event.y, height, true));
      rotateY.value = withTiming(interpolateRotation(event.x, width));
    })
    .onUpdate(event => {
      rotateX.value = interpolateRotation(event.y, height, true);
      rotateY.value = interpolateRotation(event.x, width);
    })
    .onFinalize(() => {
      rotateX.value = withTiming(0);
      rotateY.value = withTiming(0);
    });

  const rStyle = useAnimatedStyle(
    () => ({
      transform: [
        { perspective: 300 },
        { rotateX: `${rotateX.value}deg` },
        { rotateY: `${rotateY.value}deg` },
      ],
    }),
    []
  );

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            height,
            width,
          },
          rStyle,
        ]}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

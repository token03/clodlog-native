import { ReactNode } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Platform } from 'react-native'; // Import Platform

interface GestureContainerProps {
  width: number;
  height: number;
  children: ReactNode;
  maxAngle?: number;
  onGestureStart?: () => void;
  onGestureEnd?: () => void;
  onPointerMove?: (pos: {
    relativeX: number;
    relativeY: number;
    rawX: number;
    rawY: number;
  }) => void;
}

const springConfig = {
  mass: 1,
  damping: 15,
  stiffness: 150,
  overshootClamping: false,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
};

// Helper function to calculate rotation and notify pointer move
// Needs to be a worklet function
const updateRotationAndPointer = (
  eventX: number,
  eventY: number,
  width: number,
  height: number,
  maxAngle: number,
  rotateX: Animated.SharedValue<number>,
  rotateY: Animated.SharedValue<number>,
  onPointerMove?: GestureContainerProps['onPointerMove'] // Pass the callback type
) => {
  'worklet'; // Indicate this is a worklet
  const offsetX = eventX - width / 2;
  const offsetY = eventY - height / 2;

  const targetRotateY = interpolate(
    offsetX,
    [-width / 2, width / 2],
    [maxAngle, -maxAngle],
    Extrapolate.CLAMP
  );
  const targetRotateX = interpolate(
    offsetY,
    [-height / 2, height / 2],
    [-maxAngle, maxAngle], // Flipped sign for more natural tilt
    Extrapolate.CLAMP
  );

  // Apply rotation directly (no spring here for immediate response)
  rotateX.value = targetRotateX;
  rotateY.value = targetRotateY;

  const relativeX = Math.max(0, Math.min(1, eventX / width));
  const relativeY = Math.max(0, Math.min(1, eventY / height));

  if (onPointerMove) {
    // Pass the data object directly to runOnJS
    runOnJS(onPointerMove)({
      relativeX,
      relativeY,
      rawX: eventX,
      rawY: eventY,
    });
  }
};

// Helper function to reset rotation and pointer
const resetRotationAndPointer = (
  width: number,
  height: number,
  rotateX: Animated.SharedValue<number>,
  rotateY: Animated.SharedValue<number>,
  onPointerMove?: GestureContainerProps['onPointerMove'],
  onGestureEnd?: GestureContainerProps['onGestureEnd']
) => {
  'worklet';
  rotateX.value = withSpring(0, springConfig);
  rotateY.value = withSpring(0, springConfig);

  if (onPointerMove) {
    runOnJS(onPointerMove)({
      relativeX: 0.5,
      relativeY: 0.5,
      rawX: width / 2,
      rawY: height / 2,
    });
  }
  if (onGestureEnd) {
    runOnJS(onGestureEnd)();
  }
};

export function GestureContainer({
  width,
  height,
  children,
  maxAngle = 15,
  onGestureStart,
  onGestureEnd, // We'll call this from our reset helper
  onPointerMove,
}: GestureContainerProps) {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const isPressed = useSharedValue(false); // Track press state

  // --- Pan Gesture (Handles Press Down & Drag) ---
  const panGesture = Gesture.Pan()
    .onBegin(event => {
      isPressed.value = true; // Set pressed state
      if (onGestureStart) {
        runOnJS(onGestureStart)();
      }
      // Apply initial tilt on press down
      updateRotationAndPointer(
        event.x,
        event.y,
        width,
        height,
        maxAngle,
        rotateX,
        rotateY,
        onPointerMove
      );
    })
    .onUpdate(event => {
      // Update tilt during drag
      updateRotationAndPointer(
        event.x,
        event.y,
        width,
        height,
        maxAngle,
        rotateX,
        rotateY,
        onPointerMove
      );
    })
    .onEnd(() => {
      // Reset on release only if not hovering (or let hover handle it)
      // Simpler: always reset, hover will re-apply if needed
      resetRotationAndPointer(width, height, rotateX, rotateY, onPointerMove, onGestureEnd);
    })
    .onFinalize(() => {
      // Ensure reset and pressed state clear happens even if gesture is cancelled
      isPressed.value = false;
      // Redundant reset check, but safe
      if (rotateX.value !== 0 || rotateY.value !== 0) {
        resetRotationAndPointer(
          width,
          height,
          rotateX,
          rotateY,
          onPointerMove,
          onGestureEnd // Pass onGestureEnd here too if needed on finalize
        );
      }
    });

  // --- Hover Gesture (Handles Web Hover) ---
  const hoverGesture = Gesture.Hover()
    .onUpdate(event => {
      // Only tilt on hover if NOT currently pressed down
      if (!isPressed.value) {
        updateRotationAndPointer(
          event.x,
          event.y,
          width,
          height,
          maxAngle,
          rotateX,
          rotateY,
          onPointerMove
        );
      }
    })
    .onEnd(() => {
      // Reset tilt when hover ends, only if NOT currently pressed down
      if (!isPressed.value) {
        resetRotationAndPointer(
          width,
          height,
          rotateX,
          rotateY,
          onPointerMove // Don't call onGestureEnd for hover end
        );
      }
    });

  // Combine gestures: Pan for press/drag, Hover for web hover
  // Only include hover gesture on web platform
  const combinedGesture =
    Platform.OS === 'web' ? Gesture.Simultaneous(panGesture, hoverGesture) : panGesture; // On native, only use pan

  const animatedStyle = useAnimatedStyle(() => {
    const transform = [
      { perspective: 1000 },
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
    ];
    return {
      transform,
    };
  });

  return (
    <GestureDetector gesture={combinedGesture}>
      <Animated.View style={[animatedStyle, { width, height }]}>{children}</Animated.View>
    </GestureDetector>
  );
}

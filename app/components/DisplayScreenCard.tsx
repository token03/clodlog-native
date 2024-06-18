import {useRouter} from "expo-router";
import {Card, CardResume} from "@tcgdex/sdk";
import {Image} from "expo-image"
import {createCardImageUrl} from "../../utils/imageUtils";
import {ImageExtension, ImageQuality} from "../../constants/enums/Image";
import {PanResponder, Pressable, TouchableOpacity} from "react-native";
import ReactParallaxTilt from "react-parallax-tilt";
import {useRef, useState} from "react";
import {useSharedValue, withSpring} from "react-native-reanimated";

type DisplayScreenCardProps = {
  card: Card | null;
  handlePress?: () => void;
};

export const DisplayScreenCard = ({ card, handlePress }: DisplayScreenCardProps) => {
  const [loading, setLoading] = useState(true);
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  const randomSeed = {
    x: Math.random(),
    y: Math.random(),
  };

  const cosmosPosition = {
    x: Math.floor(randomSeed.x * 734),
    y: Math.floor(randomSeed.y * 1280)
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const percentX = (gestureState.moveX / e.nativeEvent?.layout.width) * 100;
        const percentY = (gestureState.moveY / e.nativeEvent.layout.height) * 100;
        rotateX.value = withSpring((percentY - 50) / 2);
        rotateY.value = withSpring(-(percentX - 50) / 3.5);
        opacity.value = withSpring(1);
      },
      onPanResponderRelease: () => {
        rotateX.value = withSpring(0);
        rotateY.value = withSpring(0);
        opacity.value = withSpring(0);
      },
    })
  ).current;
  
  return (
    <ReactParallaxTilt
      glareEnable={true}
      glareMaxOpacity={0.5}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="20px"
      style={{height: '100%', flex: 1}}
    >
      <Image
        placeholder={{
          uri: '/assets/images/placeholder.png'
        }}
        source={
          {
            uri: createCardImageUrl(card?.image, ImageQuality.HIGH, ImageExtension.WEBP),
          }
        }
        style={{
          flex: 1,
          height: '100%',
        }}
        priority={"high"}
        pointerEvents={"none"}
        contentFit={"contain"}
        placeholderContentFit={"contain"}
        onTouchEndCapture={() => handlePress && handlePress()}
      />
    </ReactParallaxTilt>
  );
}

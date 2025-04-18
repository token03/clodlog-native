import {
  Canvas,
  RadialGradient,
  vec,
  useImage,
  Image as SkiaImage,
  LinearGradient,
  Group,
  RoundedRect,
  Color,
} from '@shopify/react-native-skia';
import { useMemo } from 'react';

interface ImageCanvasProps {
  width: number;
  height: number;
  gradientCenter: { x: number; y: number };
  imageUrl: string | null;
  maskUrl?: string | null;
  placeholderColor?: Color;
}

export function ImageCanvas({
  width,
  height,
  gradientCenter,
  imageUrl,
  maskUrl,
  placeholderColor = 'grey',
}: ImageCanvasProps) {
  const cardImage = useImage(imageUrl);
  const maskImage = useImage(maskUrl);

  const glareShinyLayer = useMemo(() => {
    return (
      <Group blendMode={'overlay'}>
        <RoundedRect x={0} y={0} r={17} width={width} height={height}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: width, y: height }}
            colors={[
              'rgba(255, 255, 255, 0.15)',
              'rgba(0, 0, 0, 0.25)',
              'rgba(128, 128, 128, 0.2)',
            ]}
          />
        </RoundedRect>
        <RoundedRect x={0} y={0} width={width} r={17} height={height} color='white'>
          <RadialGradient
            c={vec(gradientCenter.x, gradientCenter.y)}
            r={Math.max(width, height)}
            colors={['hsla(0, 0%, 100%, 0.7)', 'hsla(0, 0%, 100%, 0.5)', 'hsla(0, 0%, 0%, 0.4)']}
            positions={[0.1, 0.3, 0.9]}
          />
        </RoundedRect>
      </Group>
    );
  }, [width, height, gradientCenter]);

  return (
    <Canvas style={{ width, height }}>
      {!cardImage && (
        <RoundedRect x={0} y={0} width={width} height={height} r={17} color={placeholderColor} />
      )}

      {cardImage && (
        <SkiaImage image={cardImage} x={0} y={0} height={height} width={width} fit='cover' />
      )}

      {cardImage && maskImage && (
        <SkiaImage
          image={maskImage}
          x={0}
          y={0}
          height={height}
          width={width}
          fit='cover'
          opacity={0.8}
          blendMode='overlay'
        />
      )}

      {cardImage && glareShinyLayer}
    </Canvas>
  );
}

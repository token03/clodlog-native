import {Image} from "tamagui";
import React from "react";

type GridCardProps = {
  url: string;
  multiplier: number;
};

export const DisplayCard = ({ url, multiplier }: GridCardProps) => {
  const currentWidth = 63;
  const currentHeight = 88;

  const newWidth = currentWidth * multiplier;
  const newHeight = currentHeight * multiplier;

  return (
    <Image
      source={{
        uri: url,
        width: newWidth,
        height: newHeight,
      }}
      pointerEvents={"none"}
    />
  );
}
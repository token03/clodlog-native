import {Image } from "expo-image"
import React from "react";

type GridCardProps = {
  url: string;
};

export const DisplayCard = ({ url }: GridCardProps) => {
  return (
      <Image
        source={{
          uri: url,
        }}
        style={{
          flex: 1,
        }}
        pointerEvents={"none"}
        contentFit={"contain"}
      />
  );
}
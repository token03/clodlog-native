import {Button, ButtonText, XStack} from "tamagui";
import {Image} from "expo-image"
import React from "react";
import {SetResume} from "@tcgdex/sdk";
import {useRouter} from "expo-router";
import {createSymbolLogoUrl} from "../../../utils/imageUtils";
import {ImageExtension} from "../../../constants/enums/Image";

interface BrowseSetButtonProps {
  set: SetResume;
}

const buttonProps = {
  chromeless: true,
  size: "$4",
  width: "100vw",
  borderRadius: 0,
  borderBottomColor: "$black3",
}

export const BrowseSetButton = ({set}: BrowseSetButtonProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/browse/set/`);
    router.setParams({ setId: set.id });
  };

  return (
    <Button {...buttonProps} onPress={handlePress}>
      <XStack justifyContent={"space-between"} width={"100%"}>
          <Image
            style={{
              flex: 1,
              maxWidth: 70,
            }}
            source={{
              uri: createSymbolLogoUrl(set.logo, ImageExtension.WEBP)
            }}
            contentFit={"contain"}
          />

        <ButtonText>{set.name}</ButtonText>
      </XStack>
    </Button>
  )
}

import {Button, ButtonText, XStack} from "tamagui";
import { Image } from "expo-image"
import React from "react";
import {SetResume} from "@tcgdex/sdk";
import {createSetLogoUrl} from "../../services/imageService";
import {useNavigation, useRouter} from "expo-router";

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
  const navigation = useNavigation();
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
              uri: createSetLogoUrl(set.id),
            }}
            contentFit={"contain"}
          />

        <ButtonText>{set.name}</ButtonText>
      </XStack>
    </Button>
  )
}

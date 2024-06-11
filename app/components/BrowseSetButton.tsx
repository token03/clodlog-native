import {Button, ButtonText, Image, XStack} from "tamagui";
import React from "react";
import {SetResume} from "@tcgdex/sdk";
import {createSetLogoUrl} from "../services/imageService";

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
  return (
    <Button {...buttonProps} onPress={() => {}}>
      <XStack justifyContent={"space-between"} width={"100%"}>
          <Image
            source={{
              uri: createSetLogoUrl(set.id),
            }}
            width={"$6"}
            // resizeMethod={"resize"}
            resizeMode={"stretch"}
          />

        <ButtonText>{set.name}</ButtonText>
      </XStack>
    </Button>
  )
}

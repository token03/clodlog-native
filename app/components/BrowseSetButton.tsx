import {Button, ButtonText, Image, XStack} from "tamagui";
import React from "react";

interface BrowseSetButtonProps {
  setId: string;
}

const buttonProps = {
  chromeless: true,
  size: "$4",
  width: "100vw",
  borderRadius: 0,
  borderBottomColor: "$black3",
}
export const BrowseSetButton = ({setId}: BrowseSetButtonProps) => {
  return (
    <Button {...buttonProps} onPress={() => {}}>
      <XStack justifyContent={"space-between"} width={"100%"}>
        <Image
          source={{
            uri: 'https://images.pokemontcg.io/sv5/logo.png',
        }}
          width={"15%"}
        />
        <ButtonText>{"Temporal Forces"}</ButtonText>
      </XStack>
    </Button>
  )
}

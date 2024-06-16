import {
  Button,
  ButtonProps,
  ButtonText,
  Image,
  Paragraph,
  Separator,
  Text,
  View,
  XStack,
  XStackProps,
  YStack
} from 'tamagui'
import {ChevronRight} from "@tamagui/lucide-icons";

const buttonProps : ButtonProps = {
  chromeless: true,
  size: "$4",
  width: "100vw",
  borderRadius: 0,
}

const separatorProps  = {
  marginVertical: 20,
  width: "90%",
  borderColor: "$black7",
}

const xStackProps : XStackProps = {
  justifyContent: "space-between",
  width: "90%",
};

export default function MoreTabScreen() {
  return (
    <View flex={1} alignItems="center" justifyContent="center">
      <YStack width={"80%"} alignItems={"center"} justifyContent={"center"}>
      <Image
        source={{
          uri: "https://www.serebii.net/scarletviolet/pokemon/new/980.png",
          width: 200,
          height: 150,
        }}
      />
        <Separator {...separatorProps}/>
        <Button {...buttonProps} onPress={() => {}}>
          <XStack {...xStackProps}>
            <ButtonText>{"General"}</ButtonText>
            <ChevronRight/>
          </XStack>
        </Button>
        <Button {...buttonProps} onPress={() => {}}>
          <XStack {...xStackProps}>
            <ButtonText>{"Theme"}</ButtonText>
            <ChevronRight/>
          </XStack>
        </Button>
        <Button {...buttonProps} onPress={() => {}}>
          <XStack {...xStackProps}>
            <ButtonText>{"Layout"}</ButtonText>
            <ChevronRight/>
          </XStack>
        </Button>
        <Button {...buttonProps} onPress={() => {}}>
          <XStack {...xStackProps}>
            <ButtonText>{"Backup"}</ButtonText>
            <ChevronRight/>
          </XStack>
        </Button>
        <Separator {...separatorProps}/>
        <Paragraph size={"$1"}>1.0.0  • 20240608</Paragraph>
      </YStack>
    </View>
  )
}

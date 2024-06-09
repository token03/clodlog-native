import {Button, ButtonText, Image, Paragraph, Separator, Text, View, XStack, YStack} from 'tamagui'
import {ChevronRight} from "@tamagui/lucide-icons";

const buttonProps = {
  chromeless: true,
  size: "$4",
  width: "100vw",
  borderRadius: 0,
}

const seperatorProps = {
  marginVertical: 20,
  width: "90%",
  borderColor: "$black7",
}

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
        <Separator {...seperatorProps}/>
        <Button {...buttonProps} onPress={() => {}}>
          <XStack justifyContent={"space-between"} width={"90%"}>
            <ButtonText>{"General"}</ButtonText>
            <ChevronRight/>
          </XStack>
        </Button>
        <Button {...buttonProps} onPress={() => {}}>
          <XStack justifyContent={"space-between"} width={"90%"}>
            <ButtonText>{"Theme"}</ButtonText>
            <ChevronRight/>
          </XStack>
        </Button>
        <Button {...buttonProps} onPress={() => {}}>
          <XStack justifyContent={"space-between"} width={"90%"}>
            <ButtonText>{"Layout"}</ButtonText>
            <ChevronRight/>
          </XStack>
        </Button>
        <Separator {...seperatorProps}/>
        <Paragraph size={"$1"}>1.0.0  • 20240608</Paragraph>
      </YStack>
    </View>
  )
}

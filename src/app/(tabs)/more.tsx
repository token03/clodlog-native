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
import {useRouter} from "expo-router";

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
  const router = useRouter();
  
  const handlePressWishlist = () => {
    router.push(`/wishlist/manage/`);
  };

  const handlePressCollection = () => {
    router.push(`/collection/manage/`);
  };
  
  const handlePressGeneral = () => {
    router.push(`/more/general/`);
  };

  const handlePressAppearance = () => {
    router.push(`/more/appearance/`);
  };

  const handlePressBackup = () => {
    router.push(`/more/backup/`);
  };
  
  return (
    <View flex={1} alignItems="center" justifyContent="center">
      <YStack width={"80%"} alignItems={"center"} justifyContent={"center"}>
      <Image
        source={{
          uri: "/assets/images/favicon.png",
          width: 200,
          height: 150,
        }}
      />
        <Separator {...separatorProps}/>
        
        <Button {...buttonProps} onPress={handlePressGeneral}>
          <XStack {...xStackProps}>
            <ButtonText>{"General"}</ButtonText>
            <ChevronRight/>
          </XStack>
        </Button>
        <Button {...buttonProps} onPress={handlePressAppearance}>
          <XStack {...xStackProps}>
            <ButtonText>{"Appearance"}</ButtonText>
            <ChevronRight/>
          </XStack>
        </Button>
        <Button {...buttonProps} onPress={handlePressBackup}>
          <XStack {...xStackProps}>
            <ButtonText>{"Backup"}</ButtonText>
            <ChevronRight/>
          </XStack>
        </Button>

        <Separator {...separatorProps}/>
        
        <Button {...buttonProps} onPress={handlePressWishlist}>
          <XStack {...xStackProps}>
            <ButtonText>{"Wishlists"}</ButtonText>
            <ChevronRight/>
          </XStack>
        </Button>
        <Button {...buttonProps} onPress={handlePressCollection}>
          <XStack {...xStackProps}>
            <ButtonText>{"Collections"}</ButtonText>
            <ChevronRight/>
          </XStack>
        </Button>
        
        <Separator {...separatorProps}/>
        
        <Paragraph size={"$1"}>1.0.0  • 20240608</Paragraph>
      </YStack>
    </View>
  )
}

import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {H4, H5, H6, Paragraph, ScrollView, Separator, XStack, YStack} from "tamagui";
import {Image} from "expo-image";
import {LinearGradient} from "tamagui/linear-gradient";
import {BlurView} from "expo-blur";
import {NavigationProp} from "@react-navigation/core";
import {WishlistDialogButton} from "../components/WishlistDialogButton";
import {ArrowUp} from "@tamagui/lucide-icons";
import {DisplayScreenCard} from "../components/DisplayScreenCard";
import {Card} from "../../classes/card";
import {CreateWishlistDialogButton} from "../wishlist/components/CreateWishlistDialogButton";

const seperatorProps = {
  width: "80%",
  borderColor: "$black7",
}

type CardScreenProps = {
  cardId: string;
  navigation: NavigationProp<ReactNavigation.RootParamList>
};

export const CardScreen = ({ cardId, navigation}: CardScreenProps) => {
  const [card, setCard] = useState<Card | null>(null);
  
  useEffect(() => {
    const fetchCard = async () => {
      const card = await Card.find(cardId);
      setCard(card);
    }
    fetchCard();
  }, [cardId]);
  

  useEffect(() => {
    if (card) {
      navigation.setOptions({
        title: card.name,
        headerTitle: () => (
          <XStack
            alignContent={"center"}
            justifyContent={"space-between"}
            width={"78vw"}
          >
            <H6>{card.set.name} - {card.number}/{card.set.printedTotal}</H6>
          </XStack>
        )
      });
    }
  }, [card, navigation]);
  
  const handlePress = () => {
    
  }

  return (
    <ScrollView>
      <View style={{flex: 1, overflow: 'hidden'}}>
        <BlurView style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
          <Image
            source={{
              uri: card?.images?.small,
            }}
            style={{
              flex: 1,
              width: '100%',
              height: '110%',
              marginTop: '-33%',
              marginBottom: '-10%',
              resizeMode: 'cover', 
            }}
            blurRadius={3}
          />
        </BlurView>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.85)', 'rgba(0, 0, 0, 1)']}
          style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
          locations={[0, 0.35, 0.8]}
        />      
        <YStack gap={"$3"} padding={"$3"} height={"100%"}  alignItems={"center"}>
          <XStack width={"80%"} overflow={"visible"}>
            <DisplayScreenCard card={card} />
          </XStack>
          
          <XStack paddingTop={"$2"} gap={"$5"} justifyContent={"center"} width={"80%"}>
            <XStack >
              <WishlistDialogButton Card={card as Card} />
            </XStack>
          </XStack>
          
          <Separator {...seperatorProps}/>
          
          <YStack width={"80%"}>
            <XStack justifyContent={"space-between"}>
              <H6 width={"70%"}>
                {card?.name} 
              </H6>
              {card?.hp && <H6>{card.hp} HP</H6>}
            </XStack>
            <XStack justifyContent={"space-between"}>
              <Paragraph size={"$1"} alignContent={"center"}>
                {card?.rarity} · {card?.supertype}
              </Paragraph>
              <Paragraph size={"$1"} alignContent={"center"}>
                {card?.artist}
              </Paragraph>
            </XStack>
          </YStack>
          
          <Separator {...seperatorProps}/>

          {
            card?.rules &&
            <YStack width={"80%"} gap={"$2"}>
              {card?.rules?.map((rule, index) => (
                <Paragraph key={index} size={"$2"}>{rule}</Paragraph>
              ))}
            </YStack>
          }

          {
            card?.abilities &&
            <YStack width={"80%"} gap={"$2"}>
              {card?.abilities?.map((ability, index) => (
                <YStack key={index} gap={"$2"}>
                  <XStack justifyContent={"space-between"}>
                    <Paragraph size={"$2"}>Ability - {ability.name}</Paragraph>
                  </XStack>
                  <Paragraph size={"$1"}>{ability.text}</Paragraph>
                </YStack>
              ))}
            </YStack>
          }

          {
            card?.attacks &&
            <YStack width={"80%"} gap={"$2"}>
              {card?.attacks?.map((attack, index) => (
                <YStack key={index} gap={"$2"}>
                  <XStack justifyContent={"space-between"}>
                    <Paragraph size={"$2"}>{attack.name}</Paragraph>
                    <Paragraph size={"$2"}>{attack.damage}</Paragraph>
                  </XStack>
                  <Paragraph size={"$1"}>{attack.text}</Paragraph>
                </YStack>
              ))}
            </YStack>
          }

          <Separator {...seperatorProps}/>
          
            <XStack gap={"$2"} justifyContent={"flex-start"} width="80%">
              <H6 size={"$1"}>
                Price: $0.00 / 50%
              </H6>
              <ArrowUp size={"$1"}/>
            </XStack>

        </YStack>
      </View>
      <CreateWishlistDialogButton/>
    </ScrollView>
  );
};
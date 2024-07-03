import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {H5, H6, Paragraph, ScrollView, Separator, XStack, YStack} from "tamagui";
import {Image} from "expo-image";
import {LinearGradient} from "tamagui/linear-gradient";
import {BlurView} from "expo-blur";
import {NavigationProp} from "@react-navigation/core";
import {WishlistDialogButton} from "../components/WishlistDialogButton";
import {DisplayScreenCard} from "../components/DisplayScreenCard";
import {Card} from "../../classes/card";
import {CollectionDialogButton} from "../components/CollectionDialogButton";
import {EnergyIcon} from "../components/EnergyIcon";

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
    <View style={{flex: 1, overflow: 'hidden'}}>
      <ScrollView>
        <BlurView style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, overflow: "hidden" }}>
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
              <CollectionDialogButton Card={card as Card}/>
            </XStack>
          </XStack>
          
          <Separator {...seperatorProps}/>
          
          <YStack width={"80%"}>
            <XStack justifyContent={"space-between"}>
              <H5 width={"75%"}>
                {card?.name} 
              </H5>
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
            card?.rules && card.rules.length > 1 &&
            <YStack width={"80%"} gap={"$2"}>
              {card?.rules?.slice(0, -1).map((rule, index) => (
                <Paragraph key={index} size={"$2"}>{rule}</Paragraph>
              ))}
            </YStack>
          }

          {
            card?.abilities &&
            <>
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
              <Separator {...seperatorProps}/>
            </>
          }

          {
            card?.attacks &&
            <YStack width={"80%"} gap={"$2"}>
              {card?.attacks?.map((attack, index) => (
                <YStack key={index} gap={"$2"}>
                  <XStack justifyContent={"space-between"}>
                    <XStack gap={"$2"}>
                      <Paragraph size={"$2"}>{attack.name}</Paragraph>
                      {
                        attack.cost && 
                        <XStack gap={"$1"} >
                          {attack.cost.map((cost, index) => (
                            <EnergyIcon type={cost} key={index}/>
                            ))}
                        </XStack>
                      }
                    </XStack>
                    <Paragraph size={"$2"}>{attack.damage}</Paragraph>
                  </XStack>
                  <Paragraph size={"$1"}>{attack.text}</Paragraph>
                </YStack>
              ))}
            </YStack>
          }

          <Separator {...seperatorProps}/>
          
            <XStack gap={"$2"} justifyContent={"space-between"} width="80%" paddingBottom={"$2"}>
              <H6 size={"$1"}>
                Ungraded: {card?.prices?.["normal"]?.["ungraded"] || "N/A"}
              </H6>
              <H6 size={"$1"}>
                PSA 10: {card?.prices?.["normal"]?.["psa10"] || "N/A"}
              </H6>
            </XStack>

        </YStack>
      </ScrollView>
    </View>
  );
};
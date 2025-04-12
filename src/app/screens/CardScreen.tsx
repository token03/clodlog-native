import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { H6, Paragraph, ScrollView, Separator, XStack, YStack } from "tamagui";
import { NavigationProp } from "@react-navigation/core";
import { Card } from "../../types/classes/card";
import { SCREEN_CARD_ASPECT_RATIO } from "../../constants/DisplayCards";
import { ScreenHeader } from "@/components/ScreenHeader";
import { DisplayScreenCard } from "./components/DisplayScreenCard";
import { WishlistDialogButton } from "@/components/CardGroup/WishlistDialogButton";
import { CollectionDialogButton } from "@/components/CardGroup/CollectionDialogButton";
import { CardHeader } from "./components/CardHeader";
import { CardAbilities } from "./components/CardAbilities";
import { CardAttacks } from "./components/CardAttacks";
import { BlurredGradientCard } from "./components/BlurredGradientCard";
import { useSettings } from "../../contexts/SettingContext";
import { PriceType } from "../../types/enums/PriceType";
import { convertCurrency } from "../../utils/cardUtils";

type CardScreenProps = {
  cardId: string;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
};

const CONTENT_WIDTH = "80%";

const separatorProps = {
  width: CONTENT_WIDTH,
  borderColor: "$black7",
};

export const CardScreen: React.FC<CardScreenProps> = ({
  cardId,
  navigation,
}) => {
  const [card, setCard] = useState<Card | null>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const { settings } = useSettings();

  useEffect(() => {
    const fetchCard = async () => {
      const fetchedCard = await Card.find(cardId);
      setCard(fetchedCard);
    };
    fetchCard();
  }, [cardId]);

  useEffect(() => {
    if (card) {
      navigation.setOptions({
        title: card.name,
        headerTitle: () => (
          <ScreenHeader
            title={`${card.set.name} - ${card.number} / ${card.set.printedTotal}`}
          />
        ),
      });
    }
  }, [card, navigation]);

  return (
    <View style={{ flex: 1, overflow: "hidden" }}>
      <ScrollView scrollEnabled={scrollEnabled}>
        <BlurredGradientCard img={card?.images?.small} />

        <YStack gap="$3" padding="$3" height="100%" alignItems="center">
          <XStack
            overflow="visible"
            aspectRatio={SCREEN_CARD_ASPECT_RATIO}
            width={CONTENT_WIDTH}
            pointerEvents={"none"}
          >
            <DisplayScreenCard
              card={card}
              isHolographic={settings.holographic}
              setScrollEnabled={setScrollEnabled}
            />
          </XStack>

          <XStack
            paddingTop="$2"
            gap="$5"
            justifyContent="center"
            width={CONTENT_WIDTH}
          >
            <XStack>
              <WishlistDialogButton Card={card as Card} />
              <CollectionDialogButton Card={card as Card} />
            </XStack>
          </XStack>

          <Separator {...separatorProps} />

          <YStack width={CONTENT_WIDTH}>
            <CardHeader card={card} />
          </YStack>

          <Separator {...separatorProps} />

          {card?.rules && card.rules.length > 1 && (
            <YStack width={CONTENT_WIDTH} gap="$2">
              {card.rules.slice(0, -1).map((rule, index) => (
                <Paragraph key={index} size="$2">
                  {rule}
                </Paragraph>
              ))}
            </YStack>
          )}

          {card?.abilities && (
            <>
              <YStack width={CONTENT_WIDTH}>
                <CardAbilities card={card} />
              </YStack>
              <Separator {...separatorProps} />
            </>
          )}

          {card?.attacks && (
            <YStack width={CONTENT_WIDTH}>
              <CardAttacks card={card} />
            </YStack>
          )}

          <Separator {...separatorProps} />

          <XStack
            gap="$2"
            justifyContent="space-between"
            width={CONTENT_WIDTH}
            paddingBottom="$2"
          >
            <H6 size="$1">
              Ungraded:{" "}
              {convertCurrency(
                card?.prices?.["normal"]?.[PriceType.Ungraded],
                settings.currency
              )}
            </H6>
            <H6 size="$1">
              PSA 10:{" "}
              {convertCurrency(
                card?.prices?.["normal"]?.[PriceType.PSA10],
                settings.currency
              )}
            </H6>
          </XStack>
        </YStack>
      </ScrollView>
    </View>
  );
};

import React, {useEffect} from 'react';
import {Button, ButtonText, Label, ScrollView, Separator, Switch, View, XStack, YStack} from "tamagui";
import {useNavigation} from "expo-router";
import {useSettings} from "../../contexts/SettingContext";
import {Currency} from "../../constants/Currency";
import {GridColumnSlider} from "./components/GridColumnSlider";
import {SettingSection} from "./components/SettingSection";
import {CurrencySelector} from "./components/CurrencySelector";
import {ScreenHeader} from "../components/ScreenHeader";
import {SelectItem} from "../components/Select";
import {Sort, SortDirection, SortDirectionOptions, SortOptions} from "../../types/sort";
import {PriceType} from "../../types/enums/PriceType";

const labelProps = {
  size: "$3",
  width: "30%",
}

const GeneralScreen = () => {
  const navigation = useNavigation();
  const { settings, updateSetting, resetSettings } = useSettings();

  useEffect(() => {
    navigation.setOptions({
      title: "General",
      headerTitle: () => <ScreenHeader title="General" />
    });
  }, [navigation]);

  const updateCurrency = async (currency: string) => {
    await updateSetting('currency', Currency[currency]);
  }
  
  const onSortChange = (sort: Sort) => {
    updateSetting('defaultSort', sort);
  }
  
  const onSortDirectionChange = (direction: SortDirection) => {
    updateSetting('defaultSortDirection', direction);
  }

  return (
    <ScrollView>
      <View flex={1} padding="$6">
        <YStack gap="$5">
          <SettingSection title="Card Details">
            <CurrencySelector
              currentCurrency={settings.currency.name}
              onValueChange={updateCurrency}
              labelProps={labelProps}
            />
            <XStack gap={"$3"}>
              <Label {...labelProps}>
                Price Type:
              </Label>
              <SelectItem
                items={Object.entries(PriceType).map(([key, value]) => ({
                  label: key,
                  value: value 
                }))}
                width={`${95 - parseInt(labelProps.width as string)}%`}
                value={settings.gridPriceType}
                onValueChange={(value) => updateSetting('gridPriceType', value as PriceType)}
                size={"$3"}
                label={"Price Type:"}
              />
            </XStack>
            <XStack gap={"$3"}>
              <Label {...labelProps}>
                Holographic:
              </Label>
              <Switch checked={settings.holographic} onCheckedChange={(value) => updateSetting('holographic', value)} size={"$3"} alignSelf={"center"}>
                <Switch.Thumb animation="quicker" size={"$3"}/>
              </Switch>
            </XStack>
          </SettingSection>
          
          <Separator />

          <SettingSection title="Card Grid">
            <GridColumnSlider
              value={settings.displayGridColumns}
              onValueChange={(value) => updateSetting('displayGridColumns', value)}
              labelProps={labelProps}
            />
            <XStack>
              <Label {...labelProps}>
                Sort:
              </Label>
              <SelectItem width={"70%"} size={"$3"} value={settings.defaultSort} onValueChange={onSortChange} items={SortOptions} label={"Sort By:"}/>
            </XStack>
            <XStack>
              <Label {...labelProps}>
                Sort Direction:
              </Label>
              <SelectItem width={"70%"} size={"$3"} value={settings.defaultSortDirection} onValueChange={onSortDirectionChange} items={SortDirectionOptions} label={"Direction:"} />
            </XStack>
            <XStack gap={"$3"}>
              <Label {...labelProps}>
                Display Price:
              </Label>
              <Switch checked={settings.alwaysDisplayPrice} onCheckedChange={(value) => updateSetting("alwaysDisplayPrice", value)} size={"$3"} alignSelf={"center"}>
                <Switch.Thumb animation="quicker" size={"$3"} />
              </Switch>
            </XStack>
          </SettingSection>
          
          <Separator />
          
          <SettingSection title="Notification">
            <CurrencySelector
              currentCurrency={settings.currency.name}
              onValueChange={updateCurrency}
              labelProps={labelProps}
            />
          </SettingSection>

          <Separator />
          
          <SettingSection title="Language">
            <CurrencySelector
              currentCurrency={settings.currency.name}
              onValueChange={updateCurrency}
              labelProps={labelProps}
            />
          </SettingSection>

          <Separator />
          
          <Button size={"$4"} onPress={resetSettings}>
            <ButtonText>
              Reset Settings
            </ButtonText>
          </Button>
          
        </YStack>
      </View>
    </ScrollView>
  );
};

export default GeneralScreen;

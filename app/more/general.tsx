import React, {useEffect} from 'react';
import {Label, ScrollView, Separator, View, XStack, YStack} from "tamagui";
import {useNavigation} from "expo-router";
import {useSettings} from "../../contexts/SettingContext";
import {Currency} from "../../constants/Currency";
import {GridColumnSlider} from "./components/GridColumnSlider";
import {SettingSection} from "./components/SettingSection";
import {CurrencySelector} from "./components/CurrencySelector";
import {ScreenHeader} from "../components/ScreenHeader";
import {SelectItem} from "../components/Select";
import {Sort, SortDirection, SortDirectionOptions, SortOptions} from "../../types/sort";

const labelProps = {
  size: "$3",
  width: "30%",
}

const GeneralScreen = () => {
  const navigation = useNavigation();
  const { settings, updateSetting } = useSettings();

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
    <View flex={1} padding="$6">
      <ScrollView>
        <YStack gap="$5">
          <SettingSection title="Card Details">
            <CurrencySelector
              currentCurrency={settings.currency.name}
              onValueChange={updateCurrency}
              labelProps={labelProps}
            />
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
          </SettingSection>
          
        </YStack>
      </ScrollView>
    </View>
  );
};

export default GeneralScreen;

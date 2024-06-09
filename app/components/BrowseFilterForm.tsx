import {Button, Form, Input, Label, Select, XStack, YStack} from "tamagui";
import React from "react";
import {FilterAccordion} from "./FilterAccordion";
import {SelectDemoItem} from "./Select";

export const BrowseFilterForm = ({submitFilter}: {submitFilter: () => void}) => {
  const [rarities, setRarities] = React.useState([""]);
  
  const resetFilter = () => {
    setRarities([""]);
  }
  
  return (
    <Form
      alignItems="center"
      minWidth={"100%"}
      gap="$2"
      onSubmit={() => submitFilter()}
      paddingTop={"$1"}
      paddingRight={"$3"}
    >
      <YStack width={"100%"} gap={"$2"}>
        {/*Filter Controls*/}
        <XStack justifyContent={"space-between"} width={"100%"}>
          <Button size={"$3"} onPress={resetFilter} chromeless>
            Reset
          </Button>
          <Form.Trigger asChild>
            <Button size={"$3"}>
              Filter
            </Button>
          </Form.Trigger>
        </XStack>
        {/*Filter Stack*/}
        <YStack paddingTop={"$3"} gap={"$3"}>
          {/*Card Names*/}
          <XStack alignItems={"center"} gap={"$4"} justifyContent={"space-between"} paddingLeft={"$4"}>
            <Label>
              Card Names:
            </Label>
            <Input placeholder="Search..." flex={1} size={"$3"}/>
          </XStack>
          {/*Card Text*/}
          <XStack alignItems={"center"} gap={"$4"} justifyContent={"space-between"} paddingLeft={"$4"}>
            <Label>
              Card Text:
            </Label>
            <Input placeholder="Search..." flex={1} size={"$3"}/>
          </XStack>
          {/*HP*/}
          <XStack alignItems={"center"} justifyContent={"space-between"} gap={"$4"} paddingLeft={"$4"}>
            <Label>
              HP:
            </Label>
            <SelectDemoItem size={"$3"} width={"20%"}/>
            <SelectDemoItem size={"$3"} width={"60%"}/>
          </XStack>
          {/*Rarities*/}
          <XStack alignItems={"center"} justifyContent={"space-between"} gap={"$4"} paddingLeft={"$4"}>
            <Label>
              Rarity:
            </Label>
            <SelectDemoItem size={"$3"} width={"80%"}/>
          </XStack>
          {/*Card Type*/}
          {/*Is*/}
          <XStack alignItems={"center"} justifyContent={"space-between"} gap={"$4"} paddingLeft={"$4"}>
            <Label>
              Is:
            </Label>
            <SelectDemoItem size={"$3"} width={"80%"}/>
          </XStack>
          {/*Format*/}
          <FilterAccordion name={"Rarities"} options={["Ultra Mega Rare", "Super Amazing Rare"]} selectedFilters={rarities} setSelectedFilter={setRarities}/>
          {/*Series*/}
          <FilterAccordion name={"Rarities"} options={["Ultra Mega Rare", "Super Amazing Rare"]} selectedFilters={rarities} setSelectedFilter={setRarities}/>
          {/*Set*/}
          <FilterAccordion name={"Rarities"} options={["Ultra Mega Rare", "Super Amazing Rare"]} selectedFilters={rarities} setSelectedFilter={setRarities}/>
          {/*Artist*/}
        </YStack>
      </YStack>
    </Form>
  )
}

import React, {useState} from "react";
import {Button, Input, Sheet, View, XStack, YStack} from "tamagui";
import {Filter, Search} from "@tamagui/lucide-icons";
import {GenerationAccordion} from "../components/GenerationAccordion";
import {BrowseFilterForm} from "../components/BrowseFilterForm";

export default function BrowseTabScreen() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const submitFilterRequest = () => {
    setIsFilterOpen(false);
  }

  return (
    <View>
      <YStack flex={1} paddingTop={"$2"}>
        <XStack alignItems="center" padding={"$2"} columnGap={"$2"}>
          <Input placeholder="Search..." flex={1} size={"$3"}/>
          <Button onPress={() => {}}  size={"$3"}>
            <Search size={'$1'}/>
          </Button>
          <Button onPress={toggleFilter} size={"$3"}>
            <Filter size={'$1'}/>
          </Button>
        </XStack>
        <YStack flex={1} paddingTop={10}>
          <GenerationAccordion />
        </YStack>
      </YStack>
      <Sheet
        forceRemoveScrollEnabled={isFilterOpen}
        modal={true}
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        dismissOnSnapToBottom
        zIndex={100_000}
        animation="medium"
      >
        <Sheet.Overlay
          animation="medium"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle />
        <Sheet.Frame padding="$4" alignItems="center" backgroundColor={"$black2"}>
          <Sheet.ScrollView width={"100%"}>
            <BrowseFilterForm submitFilter={submitFilterRequest} />
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    </View>
  );
}

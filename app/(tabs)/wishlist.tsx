import {ButtonText, Paragraph, ScrollView, Text, View, XStack, YStack} from 'tamagui'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from "react";
import {DisplayCard} from "../components/DisplayCard";
import {Image} from "expo-image";

const Tab = createMaterialTopTabNavigator();

export default function WishlistTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: { backgroundColor:"grey" },
        tabBarItemStyle: {
          flex: 1,
          minWidth: 'auto',
          width: 'auto',
        },
        swipeEnabled: true,
      }}
    >
        <Tab.Screen 
          name="Main" 
          children={
            (props) => <WishlistScreen {...props} numColumns={2}/>
          } 
        />
        <Tab.Screen 
          name="Ooga Booga" 
          children={
            (props) => <WishlistScreen {...props} numColumns={2} />
          } 
        />
      </Tab.Navigator>
  )
}

function WishlistScreen({ numColumns }) {
  // This is just a placeholder array. Replace it with your actual data.
  const items = new Array(20).fill(0);

  // Split the items array into chunks of size numColumns.
  const rows = items.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/numColumns);

    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])

  return (
    <ScrollView>
      <YStack padding={"$2"} gap={"$3"} width={"100%"}>
        {rows.map((rowItems: Array<number> , rowIndex: number) => (
          <XStack key={rowIndex} gap={"$`1"} width={"100%"} height={230}>
            {rowItems.map((item, columnIndex) => {
              const uniqueKey = `${rowIndex}-${columnIndex}`;
              return (
                <DisplayCard
                  key={uniqueKey}
                  url="https://images.pokemontcg.io/sv4pt5/233.png"
                />
              );
            })}
          </XStack>
        ))}
      </YStack>
    </ScrollView>
  );
}



import {Image, ScrollView, Text, View, XStack, YStack} from 'tamagui'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from "react";
import {Box} from "@tamagui/lucide-icons";
import {DisplayCard} from "../components/DisplayCard";

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
          name="Home" 
          children={
            (props) => <WishlistScreen {...props} displayText={"Home Screen"} numColumns={3}/>
          } 
        />
        <Tab.Screen 
          name="Settings" 
          children={
            (props) => <WishlistScreen {...props} displayText={"Settings Screen"} numColumns={3} />
          } 
        />
      </Tab.Navigator>
  )
}

function WishlistScreen({ displayText, numColumns }) {
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
      <YStack flex={1} alignContent={"center"} padding={"$2"} gap={"$3"} width={"100%"}>
        {rows.map((rowItems, rowIndex) => (
          <XStack flex={1} justifyContent={"center"} key={rowIndex} gap={"$3"} width={"100%"}>
            {rowItems.map((item, columnIndex) => {
              const uniqueKey = `${rowIndex}-${columnIndex}`;
              return (
                <DisplayCard
                  key={uniqueKey}
                  url="https://images.pokemontcg.io/sv4pt5/233.png"
                  multiplier={1.7}
                />
              );
            })}
          </XStack>
        ))}
      </YStack>
    </ScrollView>
  );
}



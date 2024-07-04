import React, {useEffect} from 'react';
import {H6, View, XStack} from "tamagui";
import {useNavigation} from "expo-router";

const GeneralScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "General",
      headerTitle: () => (
        <XStack
          alignContent={"center"}
          justifyContent={"space-between"}
          width={"78vw"}
        >
          <H6>General</H6>
        </XStack>
      )
    });
  }, [navigation]);
  
  return (
    <View style={{ flex: 1 }}>

    </View>
  );
};

export default GeneralScreen;

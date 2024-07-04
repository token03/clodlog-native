import React, {useEffect} from 'react';
import {H6, View, XStack} from "tamagui";
import {useNavigation} from "expo-router";

const AppearanceScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Appearance",
      headerTitle: () => (
        <XStack
          alignContent={"center"}
          justifyContent={"space-between"}
          width={"78vw"}
        >
          <H6>Appearance</H6>
        </XStack>
      )
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>

    </View>
  );
};

export default AppearanceScreen;

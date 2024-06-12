import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {Paragraph} from "tamagui";

type RouteParams = {
  setId: string; 
};

const SetScreen = () => {
  const route = useRoute();
  const params = route.params as RouteParams;
  const { setId } = params;

  return (
    <View>
      <Paragraph>This is the Set screen.</Paragraph>
      <Paragraph>Set ID: {setId}</Paragraph>
    </View>
  );
};

export default SetScreen;
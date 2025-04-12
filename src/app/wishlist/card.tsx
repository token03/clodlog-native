import React, {useEffect} from 'react';
import { useRoute } from '@react-navigation/native';
import { CardScreen } from "../screens/CardScreen";
import {useNavigation} from "expo-router";
import {H6, XStack} from "tamagui";
import {Filter, MoreVertical} from "@tamagui/lucide-icons";

type RouteParams = {
  cardId: string;
};

const WishlistCardScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;
  const { cardId } = params;

  return (
    <CardScreen cardId={cardId} navigation={navigation}/>
  );
};

export default WishlistCardScreen;

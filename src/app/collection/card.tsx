import React from 'react';
import { useRoute } from '@react-navigation/native';
import { CardScreen } from '../screens/CardScreen';
import { useNavigation } from 'expo-router';

type RouteParams = {
    cardId: string;
};

const CollectionCardScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const params = route.params as RouteParams;
    const { cardId } = params;

    return <CardScreen cardId={cardId} navigation={navigation} />;
};

export default CollectionCardScreen;

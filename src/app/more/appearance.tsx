import React, { useEffect } from 'react';
import { H6, View, XStack } from 'tamagui';
import { useNavigation } from 'expo-router';
import { ScreenHeader } from '@/components/ScreenHeader';

const AppearanceScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: 'Appearance',
            headerTitle: () => <ScreenHeader title={'Appearance'} />,
        });
    }, [navigation]);

    return <View style={{ flex: 1 }}></View>;
};

export default AppearanceScreen;

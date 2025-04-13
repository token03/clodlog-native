import React, { useEffect } from 'react';
import { H6, View, XStack } from 'tamagui';
import { useNavigation } from 'expo-router';
import { ScreenHeader } from '@/components/ScreenHeader';

const BackupScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Backup',
      headerTitle: () => <ScreenHeader title={'Backup'} />,
    });
  }, [navigation]);

  return <View style={{ flex: 1 }}></View>;
};

export default BackupScreen;

import { Text, View } from 'tamagui'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function CollectionTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: { backgroundColor:"grey" },
        swipeEnabled: true,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="grah" component={SettingsScreen} />
      <Tab.Screen name="dasda" component={SettingsScreen} />
      <Tab.Screen name="dajskdhsakdlasd" component={SettingsScreen} />
      <Tab.Screen name="dahksjdhasdk" component={SettingsScreen} />
      <Tab.Screen name="basdasd" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text selectable={false}>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text selectable={false}>Settings!</Text>
    </View>
  );
}

import {Tabs} from "expo-router";
import {useTheme} from "tamagui";
import {BookOpen, Heart, Home, Search, Settings2} from "@tamagui/lucide-icons";

export default function TabLayout() {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.white2.val
      }}
    >
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color }) => <Heart color={color} />,
        }}
      />
      <Tabs.Screen
          name="collection"
          options={{
          title: 'Collection',
          tabBarIcon: ({ color }) => <BookOpen color={color} />,
          }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} />
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: 'Browse',
          tabBarIcon: ({ color }) => <Search color={color} />,
        }}
      />
      <Tabs.Screen
          name="more"
          options={{
          title: 'More',
          tabBarIcon: ({ color }) => <Settings2 color={color} />,
          }}
      />
    </Tabs>
  )
}

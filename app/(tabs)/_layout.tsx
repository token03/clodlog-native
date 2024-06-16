import {Tabs} from "expo-router";
import {H6, useTheme, XStack} from "tamagui";
import {BookOpen, Filter, Heart, Home, MoreVertical, Search, Settings2} from "@tamagui/lucide-icons";
import {StackStyleBase, WithThemeValues} from "@tamagui/web";

const headerXStackProps: WithThemeValues<StackStyleBase> = {
  alignContent: "center",
  justifyContent: "space-between",
  width: "93vw",
}

export default function TabLayout() {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.white2.val,
        tabBarStyle: {
          height: 60, 
          paddingTop: 10, 
          paddingBottom: 10, 
        },
      }}
    >
      <Tabs.Screen
        name="wishlist"
        options={{
          headerTitle: () => (
            <XStack {...headerXStackProps}>
              <H6>Wishlist</H6>
              <XStack gap={"$3"}>
                  <Search />
                  <Filter />
                  <MoreVertical />
              </XStack>
            </XStack>
          ),
          title: 'Wishlist',
          tabBarIcon: ({ color }) => <Heart color={color} />,
        }}
      />
      <Tabs.Screen
          name="collection"
          options={{
            headerTitle: () => (
              <XStack {...headerXStackProps}>
                <H6>Collection</H6>
                <XStack gap={"$3"}>
                  <Search />
                  <Filter />
                  <MoreVertical />
                </XStack>
              </XStack>
            ),
          title: 'Collection',
          tabBarIcon: ({ color }) => <BookOpen color={color} />,
          }}
      />
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: () => (
            <XStack {...headerXStackProps}>
              <H6>Home</H6>
              <XStack gap={"$3"}>
                <Search />
                <Filter />
                <MoreVertical />
              </XStack>
            </XStack>
          ),
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} />
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          headerTitle: () => (
            <XStack {...headerXStackProps}>
              <H6>Browse</H6>
              <XStack gap={"$3"}>
                <MoreVertical />
              </XStack>
            </XStack>
          ),
          title: 'Browse',
          tabBarIcon: ({ color }) => <Search color={color} />,
        }}
      />
      <Tabs.Screen
          name="more"
          options={{
            headerTitle: () => (
              <XStack {...headerXStackProps}>
                <H6>More</H6>
              </XStack>
            ),
            title: 'More',
            tabBarIcon: ({ color }) => <Settings2 color={color} />,
          }}
      />
    </Tabs>
  )
}

import { Tabs } from 'expo-router';
import { H6, useTheme, XStack } from 'tamagui';
import { BookOpen, Filter, Heart, Search, Settings2, MoreVertical } from '@tamagui/lucide-icons';
import { StackStyleBase, WithThemeValues } from '@tamagui/web';

const headerXStackProps: WithThemeValues<StackStyleBase> = {
    alignContent: 'center',
    justifyContent: 'space-between',
    width: '93vw',
};

export default function TabLayout() {
    const theme = useTheme();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.white2.val,
                tabBarStyle: {
                    height: 50,
                    paddingBottom: 5,
                },
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    headerStatusBarHeight: 0,
                    headerTitle: () => (
                        <XStack {...headerXStackProps}>
                            <H6>Wishlist</H6>
                            <XStack gap={'$3'}>
                                <Search />
                                <Filter />
                                <MoreVertical />
                            </XStack>
                        </XStack>
                    ),
                    title: '',
                    tabBarIcon: ({ color }) => <Heart color={color} />,
                }}
            />
            <Tabs.Screen
                name='collection'
                options={{
                    headerTitle: () => (
                        <XStack {...headerXStackProps}>
                            <H6>Collection</H6>
                            <XStack gap={'$3'}>
                                <Search />
                                <Filter />
                                <MoreVertical />
                            </XStack>
                        </XStack>
                    ),
                    title: '',
                    tabBarIcon: ({ color }) => <BookOpen color={color} />,
                }}
            />
            <Tabs.Screen
                name='browse'
                options={{
                    headerTitle: () => (
                        <XStack {...headerXStackProps}>
                            <H6>Browse</H6>
                            <XStack gap={'$3'}>
                                <MoreVertical />
                            </XStack>
                        </XStack>
                    ),
                    title: '',
                    tabBarIcon: ({ color }) => <Search color={color} />,
                }}
            />
            <Tabs.Screen
                name='more'
                options={{
                    headerTitle: () => (
                        <XStack {...headerXStackProps}>
                            <H6>More</H6>
                        </XStack>
                    ),
                    title: '',
                    tabBarIcon: ({ color }) => <Settings2 color={color} />,
                }}
            />
        </Tabs>
    );
}

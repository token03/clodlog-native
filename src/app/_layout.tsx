import '@/../tamagui-web.css';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { Provider } from './Provider';
import { H6, XStack } from 'tamagui';
import { StackStyleBase, WithThemeValues } from '@tamagui/web';

const headerXStackProps: WithThemeValues<StackStyleBase> = {
  alignContent: 'center',
  justifyContent: 'space-between',
  width: '78vw',
};

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Provider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name='(tabs)'
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='modal'
            options={{
              title: 'Tamagui + Expo',
              presentation: 'modal',
              animation: 'slide_from_right',
              gestureEnabled: true,
              gestureDirection: 'horizontal',
            }}
          />

          <Stack.Screen
            name={'wishlist/card'}
            options={{
              title: 'Card',
              presentation: 'modal',
              animation: 'slide_from_right',
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              headerTitle: () => (
                <XStack {...headerXStackProps}>
                  <H6>Card</H6>
                </XStack>
              ),
            }}
          />
          {/*<Stack.Screen*/}
          {/*  name={"browse/card"}*/}
          {/*  options={{*/}
          {/*    title: 'Card',*/}
          {/*    presentation: 'modal',*/}
          {/*    animation: 'slide_from_right',*/}
          {/*    gestureEnabled: true,*/}
          {/*    gestureDirection: 'horizontal',*/}
          {/*    headerTitle: () => (*/}
          {/*      <XStack {...headerXStackProps}>*/}
          {/*        <H6>Card</H6>*/}
          {/*      </XStack>*/}
          {/*    ),*/}
          {/*  }}*/}
          {/*/>*/}
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}

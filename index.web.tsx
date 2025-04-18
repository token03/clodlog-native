import '@expo/metro-runtime';
import { App } from 'expo-router/build/qualified-entry';
import { renderRootComponent } from 'expo-router/build/renderRootComponent';
import { LoadSkiaWeb } from '@shopify/react-native-skia/lib/module/web'; // Adjust path if necessary based on your node_modules structure

LoadSkiaWeb()
  .then(async () => {
    renderRootComponent(App);
  })
  .catch(error => {
    console.error('Failed to load Skia:', error);
  });

import { ExpoRoot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { Platform } from 'react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    // Configure system UI settings
    if (Platform.OS === 'ios') {
      SystemUI.setBackgroundColorAsync('#00000000');
    }

    // Hide the splash screen after a short delay to ensure resources are loaded
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };

    hideSplash();
  }, []);

  return <ExpoRoot context={require.context('./app')} />;
}
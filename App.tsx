import './src/utils/extensions/date-extensions';
import './src/utils/extensions/object-extensions';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { LogBox, StatusBar, View } from 'react-native';
import { AuthProvider } from './src/contexts/auth-context';
import AppStack from './src/settings/navigations/app-stack';
import { InfluencerProvider } from './src/contexts/influencer-context';
import FlashComponent from 'flash-notify';
import { CheckoutProvider } from './src/contexts/checkout-context';
import { HomeProvider } from './src/contexts/home-context';
import * as SplashScreen from 'expo-splash-screen';
import { useSplashScreen } from './src/utils/hooks/splash-screen-hooks';

LogBox.ignoreAllLogs(['Expected style', 'Require cycles are allowed']);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { onLayoutRootView, splashIsReady } = useSplashScreen();

  if (!splashIsReady) {
    return <View></View>;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <AuthProvider>
        <InfluencerProvider>
          <CheckoutProvider>
            <HomeProvider>
              <NavigationContainer>
                <StatusBar animated={true} barStyle={'dark-content'} />
                <AppStack />
              </NavigationContainer>
              <FlashComponent />
            </HomeProvider>
          </CheckoutProvider>
        </InfluencerProvider>
      </AuthProvider>
    </View>
  );
}

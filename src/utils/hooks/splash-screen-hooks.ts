import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

export function useSplashScreen() {
  const [splashIsReady, setSplashIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Nunito_ExtraLight: require('../../../assets/fonts/Nunito_200ExtraLight.ttf'),
          Nunito_ExtraLight_Italic: require('../../../assets/fonts/Nunito_200ExtraLight_Italic.ttf'),
          Nunito_Light: require('../../../assets/fonts/Nunito_300Light.ttf'),
          Nunito_Light_Italic: require('../../../assets/fonts/Nunito_300Light_Italic.ttf'),
          Nunito_Regular: require('../../../assets/fonts/Nunito_400Regular.ttf'),
          Nunito_Regular_Italic: require('../../../assets/fonts/Nunito_400Regular_Italic.ttf'),
          Nunito_SemiBold: require('../../../assets/fonts/Nunito_600SemiBold.ttf'),
          Nunito_SemiBold_Italic: require('../../../assets/fonts/Nunito_600SemiBold_Italic.ttf'),
          Nunito_Bold: require('../../../assets/fonts/Nunito_700Bold.ttf'),
          Nunito_Bold_Italic: require('../../../assets/fonts/Nunito_700Bold_Italic.ttf'),
          Nunito_ExtraBold: require('../../../assets/fonts/Nunito_800ExtraBold.ttf'),
          Nunito_ExtraBold_Italic: require('../../../assets/fonts/Nunito_800ExtraBold_Italic.ttf'),
        });

        await new Promise((resolve) => setTimeout(resolve, 2500));
      } catch (error) {
        console.warn(error);
      } finally {
        setSplashIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (splashIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [splashIsReady]);

  return { onLayoutRootView, splashIsReady };
}

import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import React from "react";
import { ActivityIndicator, LogBox, StatusBar, View } from "react-native";
import { AuthProvider } from './src/contexts/authContext';
import AppStack from "./src/settings/navigations/appStack";
import "./src/utils/base64Initialization";
import './src/utils/extensions/dateExtensions';
import './src/utils/extensions/objectExtensions';
import FlashComponent from 'flash-notify'
import colors from "./assets/constants/colors";

LogBox.ignoreLogs(['Expected style']);

export default function App() {


  let [fontsLoaded] = useFonts({
    Nunito_ExtraLight: require('./assets/fonts/Nunito_200ExtraLight.ttf'),
    Nunito_ExtraLight_Italic: require('./assets/fonts/Nunito_200ExtraLight_Italic.ttf'),
    Nunito_Light: require('./assets/fonts/Nunito_300Light.ttf'),
    Nunito_Light_Italic: require('./assets/fonts/Nunito_300Light_Italic.ttf'),
    Nunito_Regular: require('./assets/fonts/Nunito_400Regular.ttf'),
    Nunito_Regular_Italic: require('./assets/fonts/Nunito_400Regular_Italic.ttf'),
    Nunito_SemiBold: require('./assets/fonts/Nunito_600SemiBold.ttf'),
    Nunito_SemiBold_Italic: require('./assets/fonts/Nunito_600SemiBold_Italic.ttf'),
    Nunito_Bold: require('./assets/fonts/Nunito_700Bold.ttf'),
    Nunito_Bold_Italic: require('./assets/fonts/Nunito_700Bold_Italic.ttf'),
    Nunito_ExtraBold: require('./assets/fonts/Nunito_800ExtraBold.ttf'),
    Nunito_ExtraBold_Italic: require('./assets/fonts/Nunito_800ExtraBold_Italic.ttf')
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="black" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <FlashComponent />
        <StatusBar
          backgroundColor={colors.COLOR_SECUNDARY_WHITE}
          animated={true}
          barStyle={'dark-content'}
        />
        <AppStack />
      </NavigationContainer >
    </AuthProvider>
  );
};

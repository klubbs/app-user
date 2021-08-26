import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import FlashComponent from 'flash-notify';
import React, { useState } from "react";
import { ActivityIndicator, LogBox, StatusBar, View } from "react-native";
import { AuthProvider } from './src/contexts/auth_context';
import AppStack from "./src/settings/navigation/app_stack";
import AuthStack from "./src/settings/navigation/auth_stack";
import "./src/utils/base64_initialization";
import './src/utils/extensions/date_extensions';
import './src/utils/extensions/object_extensions';

LogBox.ignoreLogs(['Expected style']); // Ignore log notification by message

export default function App() {

  const [logged, setLogged] = useState(true)

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
        <StatusBar animated={true} barStyle={'dark-content'} />
        {logged ? <AppStack /> : <AuthStack />}
      </NavigationContainer >
    </AuthProvider>
  );
};

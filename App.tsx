import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from 'expo-font';
import React, { useState } from "react";
import { ActivityIndicator, View, StatusBar } from "react-native";
import AppStack from "./src/settings/navigation/AppStack";
import AuthStack from "./src/settings/navigation/AuthStack";

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
    <NavigationContainer>
      <StatusBar animated={true} barStyle={'dark-content'} />
      {logged ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

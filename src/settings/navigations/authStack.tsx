import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AuthStackParamList } from "./interfaces/IAuthStackParams";


const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null
      }}
      initialRouteName="Landing"
    >
      {/* <Stack.Screen name="Landing" component={Landing} /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;

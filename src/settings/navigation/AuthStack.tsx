import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthStackParamList } from "./ParamList/AuthStackParamList";

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

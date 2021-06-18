import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AppStackParamList } from "./ParamList/AppStackParamList";
import Tabs from "./AppTabStack"
import Restaurant from "../../components/screens/Restaurant"
import COLORS from "../../../assets/constants/colors"


const AppStack = createStackNavigator<AppStackParamList>();

interface AppStackProps { }

const App: React.FC<AppStackProps> = () => {
  return (
    <AppStack.Navigator screenOptions={({ navigation, route }) =>
    ({
      headerTransparent: true,
      headerBackTitleVisible: false,
      headerTintColor: COLORS.COLOR_YELLOW,
      headerTitleStyle: { color: "transparent" }
    })} >
      <AppStack.Screen name="Tabs" component={Tabs} />
      <AppStack.Screen name="Restaurant" component={Restaurant} />
    </AppStack.Navigator >
  );
};

export default App;

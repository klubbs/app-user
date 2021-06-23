import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import COLORS from "../../../assets/constants/colors";
import Register from "../../components/screens/register";
import Restaurant from "../../components/screens/restaurant";
import WelcomeLoginScreen from "../../components/screens/welcomeLogin";
import Tabs from "./AppTabStack";
import { AppStackParamList } from "./ParamList/AppStackParamList";



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
      <AppStack.Screen name="WelcomeLogin" component={WelcomeLoginScreen} />
      <AppStack.Screen name="Register" component={Register} options={{ headerShown: true }} />
      <AppStack.Screen name="Restaurant" component={Restaurant} />
    </AppStack.Navigator >
  );
};

export default App;

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import COLORS from "../../../assets/constants/colors";
import LoginPassword from "../../components/screens/loginPassword";
import WelcomeLoginScreen from "../../components/screens/loginWelcome";
import Register from "../../components/screens/register";
import Restaurant from "../../components/screens/Restaurant";
import Tabs from "./AppTabStack";
import { IAppStackParams } from "./interfaces/IAppStackParams";



const AppStack = createStackNavigator<IAppStackParams>();

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
      <AppStack.Screen name="LoginWelcome" component={WelcomeLoginScreen} />
      <AppStack.Screen name="LoginPassword" component={LoginPassword} />
      <AppStack.Screen name="Register" component={Register} options={{ headerShown: true }} />
      <AppStack.Screen name="Restaurant" component={Restaurant} />
    </AppStack.Navigator >
  );
};

export default App;

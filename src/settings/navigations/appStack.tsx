import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import colors from "../../../assets/constants/colors";
import COLORS from "../../../assets/constants/colors";
import { CouponQrScreen } from "../../components/screens/couponQr";
import { LoginPasswordScreen } from "../../components/screens/loginPassword";
import WelcomeLoginScreen from "../../components/screens/loginWelcome";
import Register from "../../components/screens/register";
import Restaurant from "../../components/screens/restaurantsProfile";
import Tabs from "./appTabStack";
import { IAppStackParams } from "../@types/IAppStackParams";



const AppStack = createStackNavigator<IAppStackParams>();


const App: React.FC<{}> = () => {
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
      <AppStack.Screen name="LoginPassword" component={LoginPasswordScreen} />
      <AppStack.Screen name="Register" component={Register} options={{ headerShown: true }} />
      <AppStack.Screen name="Restaurant" component={Restaurant} />
      <AppStack.Screen name="CouponQr" component={CouponQrScreen} options={{ headerTintColor: COLORS.COLOR_WHITE }} />
    </AppStack.Navigator >
  );
};

export default App;

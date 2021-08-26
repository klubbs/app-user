import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import COLORS from "../../../assets/constants/colors";
import { CouponQrScreen } from "../../components/screens/coupon_qr";
import { LoginPasswordScreen } from "../../components/screens/login_password";
import WelcomeLoginScreen from "../../components/screens/login_welcome";
import Register from "../../components/screens/register";
import Restaurant from "../../components/screens/restaurant";
import Tabs from "./app_tab_stack";
import { IAppStackParams } from "./interfaces/IAppStackParams";



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
      <AppStack.Screen name="CouponQr" component={CouponQrScreen} />
    </AppStack.Navigator >
  );
};

export default App;

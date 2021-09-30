import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import colors from "../../../assets/constants/colors";
import COLORS from "../../../assets/constants/colors";
import { CouponQrScreen } from "../../components/screens/CouponQr";
import { LoginPasswordScreen } from "../../components/screens/LoginPassword";
import WelcomeLoginScreen from "../../components/screens/LoginWelcome";
import Register from "../../components/screens/Register";
import Restaurant from "../../components/screens/RestaurantsProfile";
import Tabs from "./appTabStack";
import { IAppStackParams } from "../@types/appStackTypes";
import { Influencer } from "../../components/screens/Influencer";
import { MasterCoupons } from "../../components/screens/MasterCoupons";
import { ConfigurationsScreen } from "../../components/screens/Configurations";
import { HelpScreen } from "../../components/screens/Help";



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
      <AppStack.Screen name='Tabs' component={Tabs} />
      <AppStack.Screen name='LoginWelcome' component={WelcomeLoginScreen} />
      <AppStack.Screen name='LoginPassword' component={LoginPasswordScreen} />
      <AppStack.Screen name='Register' component={Register} options={{ headerShown: true }} />
      <AppStack.Screen name='Restaurant' component={Restaurant} />
      <AppStack.Screen name="CouponQr" component={CouponQrScreen} options={{ headerTintColor: COLORS.COLOR_WHITE }} />
      <AppStack.Screen name="Influencer" component={Influencer} />
      <AppStack.Screen name="MasterCoupons" component={MasterCoupons} />
      <AppStack.Screen name='Configurations' component={ConfigurationsScreen} />
      <AppStack.Screen name='Help' component={HelpScreen} />
    </AppStack.Navigator >
  );
};

export default App;

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { colors } from '../../../assets/constants/colors';
import Tabs from './appTabStack';
import WelcomeLoginScreen from '../../components/screens/LoginWelcome';
import Register from '../../components/screens/Register';
import Restaurant from '../../components/screens/RestaurantsProfile';
import { IAppStackParams } from '../@types/appStackTypes';
import { CouponQrScreen } from '../../components/screens/CouponQr';
import { LoginPasswordScreen } from '../../components/screens/LoginPassword';
import { Influencer } from '../../components/screens/Influencer';
import { Offers } from '../../components/screens/Offers';
import { SettingsScreen } from '../../components/screens/Settings';
import { HelpScreen } from '../../components/screens/Help';
import { ForgetPasswordScreen } from '../../components/screens/ForgetPassword';



const AppStack = createStackNavigator<IAppStackParams>();


const App: React.FC<{}> = () => {
  return (
    <AppStack.Navigator screenOptions={({ navigation, route }) =>
    ({
      headerTransparent: true,
      headerBackTitleVisible: false,
      headerTintColor: colors.COLOR_YELLOW,
      headerTitleStyle: { color: 'transparent', width: 0 }
    })} >
      <AppStack.Screen name='Tabs' component={Tabs} />
      <AppStack.Screen name='LoginWelcome' component={WelcomeLoginScreen} />
      <AppStack.Screen name='LoginPassword' component={LoginPasswordScreen} />
      <AppStack.Screen name='Register' component={Register} options={{ headerShown: true }} />
      <AppStack.Screen name='Restaurant' component={Restaurant} />
      <AppStack.Screen name='CouponQr' component={CouponQrScreen} options={{ headerTintColor: colors.COLOR_WHITE }} />
      <AppStack.Screen name='Influencer' component={Influencer} />
      <AppStack.Screen name='Offers' component={Offers} />
      <AppStack.Screen name='Settings' component={SettingsScreen} />
      <AppStack.Screen name='Help' component={HelpScreen} />
      <AppStack.Screen name='ForgetPassword' component={ForgetPasswordScreen} />
    </AppStack.Navigator >
  );
};

export default App;

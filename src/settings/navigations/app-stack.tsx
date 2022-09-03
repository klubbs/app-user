import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { colors } from '../../../assets/constants/colors';
import Tabs from './app-tab-stack';
import WelcomeLoginScreen from '../../components/screens/LoginWelcome';
import Register from '../../components/screens/Register';
import Restaurant from '../../components/screens/RestaurantsProfile';
import { IAppStackParams } from '../@types/@app-stack';
import { CouponQrScreen } from '../../components/screens/CouponQr';
import { LoginPasswordScreen } from '../../components/screens/LoginPassword';
import { Influencer } from '../../components/screens/Influencer';
import { Offers } from '../../components/screens/Offers';
import { SettingsScreen } from '../../components/screens/Settings';
import { HelpScreen } from '../../components/screens/Help';
import { ForgetPasswordScreen } from '../../components/screens/ForgetPassword';
import { RemoveOfferInfluencerScreen } from '../../components/screens/RemoveOfferInfluencer';
import { CreateCheckin } from '../../components/screens/create-checkin';



const AppStack = createStackNavigator<IAppStackParams>();

const DEFAULT_OPTIONS = {
  headerTransparent: true,
  headerBackTitleVisible: false,
  headerTintColor: colors.COLOR_YELLOW,
  headerTitleStyle: { color: 'transparent', width: 0 },
}

const STYLE_OPTIONS = { color: colors.COLOR_SECUNDARY_BLACK, fontFamily: 'Nunito_SemiBold' }

const App: React.FC<{}> = () => {
  return (
    <AppStack.Navigator screenOptions={({ navigation, route }) => (DEFAULT_OPTIONS)} >
      <AppStack.Screen name='Tabs' component={Tabs} />
      <AppStack.Screen name='LoginWelcome' component={WelcomeLoginScreen} />
      <AppStack.Screen name='LoginPassword' component={LoginPasswordScreen} />
      <AppStack.Screen name='Register' component={Register} options={{ headerShown: true }} />
      <AppStack.Screen name='Restaurant' component={Restaurant} />
      <AppStack.Screen name='Offers' component={Offers} />
      <AppStack.Screen name='Settings' component={SettingsScreen} />
      <AppStack.Screen name='Help' component={HelpScreen} />
      <AppStack.Screen name='ForgetPassword' component={ForgetPasswordScreen} />
      <AppStack.Screen name='Influencer' component={Influencer} />
      <AppStack.Screen
        name='CreateCheckin'
        component={CreateCheckin}
        options={{
          headerTitle: 'Criar check-in',
          headerTitleStyle: STYLE_OPTIONS
        }}
      />
      <AppStack.Screen
        name='RemoveOfferInfluencer'
        component={RemoveOfferInfluencerScreen}
        options={{ headerTintColor: colors.COLOR_WHITE }}
      />
      <AppStack.Screen
        name='CouponQr'
        component={CouponQrScreen}
        options={({ route }) => ({
          headerTintColor: colors.COLOR_WHITE,
          headerTitle: route.params.coupon_code,
          headerTitleAlign: 'center',
          headerTitleStyle: { color: colors.COLOR_WHITE_80, fontFamily: 'Nunito_Regular', fontSize: 15 }
        })}
      />
    </AppStack.Navigator >
  );
};

export default App;

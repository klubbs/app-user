import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { colors } from '../../../assets/constants/colors';
import Tabs from './app-tab-stack';
import WelcomeLoginScreen from '../../components/screens/login-welcome';
import Register from '../../components/screens/Register';
import { StoreProfile } from '../../components/screens/store-profile';
import { IAppStackParams } from '../@types/@app-stack';
import { CouponQrScreen } from '../../components/screens/coupon-qr';
import { LoginPasswordScreen } from '../../components/screens/login-password';
import { InfluencerProfile } from '../../components/screens/influencer-profile';
import { OffersForInfluencers } from '../../components/screens/offers-for-influencers';
import { UserSettings } from '../../components/screens/user-settings';
import { UserHelp } from '../../components/screens/user-help';
import { ForgetPasswordScreen } from '../../components/screens/forget-password';
import { InfluencerRemoveOffer } from '../../components/screens/influencer-remove-offer';
import { CreateCheckin } from '../../components/screens/create-checkin';
import { OfferPools } from '../../components/screens/offer-pools';



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
      <AppStack.Screen name='Restaurant' component={StoreProfile} />
      <AppStack.Screen name='OffersForInfluencers' component={OffersForInfluencers} />
      <AppStack.Screen name='Settings' component={UserSettings} />
      <AppStack.Screen name='Help' component={UserHelp} />
      <AppStack.Screen name='ForgetPassword' component={ForgetPasswordScreen} />
      <AppStack.Screen name='Influencer' component={InfluencerProfile} />
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
        component={InfluencerRemoveOffer}
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
      <AppStack.Screen name='OfferPools' component={OfferPools} />
    </AppStack.Navigator >
  );
};

export default App;

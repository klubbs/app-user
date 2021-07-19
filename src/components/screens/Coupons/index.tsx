import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useContext } from 'react';
import Gift from '../../../../assets/animations/present.json';
import { AuthContext } from '../../../contexts/AuthContext';
import Button from '../../component/button';
import CouponStorage from '../../component_heavy/coupons_list';
import Timeline from '../../component_heavy/coupons_timeline';
import { Description, SafeArea, tabStyle, Title, UnregisterBoxText, UnregisterSafeArea, UnregisterUser, UnregisterUserDesc, WrapperLottie } from './styles';

const Tab = createMaterialTopTabNavigator();

const Coupons: React.FC = () => {

  const { user } = useContext(AuthContext)
  const navigation = useNavigation()

  if (!user) {
    return (
      <UnregisterSafeArea>
        <UnregisterBoxText>
          <UnregisterUser>Quase lá</UnregisterUser>
          <UnregisterUserDesc>Entre para ter acesso ao seus cupons!</UnregisterUserDesc>
        </UnregisterBoxText>
        <WrapperLottie>
          <LottieView source={Gift} loop={true} autoPlay />
        </WrapperLottie>
        <Button text={'Entrar'} onPress={() => navigation.navigate("LoginWelcome")} styleContainer={{ width: '50%', height: 55 }} />
      </UnregisterSafeArea>
    )
  }

  return (
    <SafeArea>
      <Title>Cupons</Title>
      <Description>Você já acumulou 1200 pontos</Description>

      <Tab.Navigator tabBarOptions={tabStyle} >
        <Tab.Screen name="Armazenados" children={() => <CouponStorage />} />
        <Tab.Screen name="Utilizados" children={() => <Timeline />} />
      </Tab.Navigator>
    </SafeArea>
  );
}

export default Coupons;

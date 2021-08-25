import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext, useLayoutEffect } from 'react';
import { AuthContext } from '../../../contexts/auth_context';
import { CouponsCheckout } from '../../component_heavy/coupons_checkout';
import { CouponsEmpty } from '../../component_heavy/coupons_empty';
import { CouponsStorage } from '../../component_heavy/coupons_storage';
import { Description, SafeArea, tabStyle, Title, HeaderContainer } from './styles';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import colors from '../../../../assets/constants/colors';

const Tab = createMaterialTopTabNavigator();

export const Coupons: React.FC = () => {

  const { user } = useContext(AuthContext)


  // if (!user)
  //   return <CouponsEmpty />


  return (
    <SafeArea>
      <HeaderContainer>
        <Title>Cupons</Title>
        <Feather size={20} name={'plus-circle'} accessibilityLabel="Criar Evento" style={{ borderRadius: 50, marginRight: 10, padding: 10 }} onPress={() => navigation.navigate('CreateEvent')} color={colors.COLOR_YELLOW} />
      </HeaderContainer>
      {/* <Description>Você já acumulou 1200 pontos</Description> */}

      <Tab.Navigator tabBarOptions={tabStyle} >
        <Tab.Screen name="Armazenados" children={() => <CouponsStorage />} />
        <Tab.Screen name="Utilizados" children={() => <CouponsCheckout />} />
      </Tab.Navigator>
    </SafeArea>
  );
}

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/auth_context';
import { CouponsCheckout } from '../../component_heavy/coupons_checkout';
import { CouponsEmpty } from '../../component_heavy/coupons_empty';
import CouponStorage from '../../component_heavy/coupons_list';
import { Description, SafeArea, tabStyle, Title } from './styles';

const Tab = createMaterialTopTabNavigator();

export const Coupons: React.FC = () => {

  const { user } = useContext(AuthContext)

  if (!user)
    return <CouponsEmpty />


  return (
    <SafeArea>
      <Title>Cupons</Title>
      <Description>Você já acumulou 1200 pontos</Description>

      <Tab.Navigator tabBarOptions={tabStyle} >
        <Tab.Screen name="Armazenados" children={() => <CouponStorage />} />
        <Tab.Screen name="Utilizados" children={() => <CouponsCheckout />} />
      </Tab.Navigator>
    </SafeArea>
  );
}

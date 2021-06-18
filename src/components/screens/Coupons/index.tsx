import React from 'react';
import Timeline from '../../component_heavy/coupons_timeline'
import CouponStorage from '../../component_heavy/coupons_list'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Title, Description, tabStyle, SafeArea } from './styles';

const Tab = createMaterialTopTabNavigator();

const Coupons: React.FC = () => {
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

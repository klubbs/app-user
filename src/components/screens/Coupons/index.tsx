import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../../contexts/authContext';
import { CouponsCheckout } from '../../components_heavy/WalletCouponsCheckoutTab';
import { CouponsEmpty } from '../../components_heavy/LogoutCoupons';
import { CouponsWalletTab } from '../../components_heavy/WalletCouponsTab';
import { SafeArea, tabStyle, HeaderContainer } from './styles';
import { ButtonCreateCoupon } from '../../components/ButtonCoupon';
import { SaveOrCreateCoupon } from '../../modals/SaveOrCreateCoupon';
import { ISaveOrCreateCouponRef } from '../../modals/SaveOrCreateCoupon/@types';

const Tab = createMaterialTopTabNavigator();

export const Coupons: React.FC = () => {

  const modalRef = useRef<ISaveOrCreateCouponRef>(null)
  const { user } = useContext(AuthContext)


  if (!user)
    return <CouponsEmpty />


  return (
    <SafeArea>
      <HeaderContainer>
        <ButtonCreateCoupon onPress={() => modalRef.current?.show()} />
      </HeaderContainer>

      <Tab.Navigator tabBarOptions={tabStyle} >
        <Tab.Screen name="Carteira" children={() => <CouponsWalletTab />} />
        <Tab.Screen name="Utilizados" children={() => <CouponsCheckout />} />
      </Tab.Navigator>
      <SaveOrCreateCoupon ref={modalRef} isInfluencer={false} />
    </SafeArea>
  );
}

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../../contexts/authContext';
import { CouponsCheckout } from '../../organisms/WalletCouponsCheckoutTab';
import { CouponsEmpty } from '../../organisms/LogoutCoupons';
import { CouponsWalletTab } from '../../organisms/WalletCouponsTab';
import { SafeArea, tabStyle, HeaderContainer } from './styles';
import { ButtonCreateCoupon } from '../../components/ButtonCoupon';
import { SaveOrCreateCoupon } from '../../screensModals/SaveOrCreateCoupon';
import { ISaveOrCreateCouponRef } from '../../screensModals/SaveOrCreateCoupon/@types';

const Tab = createMaterialTopTabNavigator();

export const Coupons: React.FC = () => {

  const modalRef = useRef<ISaveOrCreateCouponRef>(null)
  const { user } = useContext(AuthContext)


  if (!user)
    return <CouponsEmpty />


  return (
    <SafeArea>
      <HeaderContainer>
        <ButtonCreateCoupon onPress={modalRef.current?.show} />
      </HeaderContainer>

      <Tab.Navigator tabBarOptions={tabStyle} >
        <Tab.Screen name="Carteira" children={() => <CouponsWalletTab />} />
        <Tab.Screen name="Utilizados" children={() => <CouponsCheckout />} />
      </Tab.Navigator>
      <SaveOrCreateCoupon ref={modalRef} isInfluencer={false} />
    </SafeArea>
  );
}

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/authContext';
import { CouponsCheckout } from '../../organisms/1WalletCouponsCheckoutTab';
import { CouponsEmpty } from '../../organisms/1LogoutCoupons';
import { CouponsWalletTab } from '../../organisms/1WalletCouponsTab';
import { SafeArea, tabStyle, HeaderContainer } from './styles';
import { ButtonCreateCoupon } from '../../components/1ButtonCoupon';
import { AddCouponModal } from '../../screensModals/1addCouponModal';

const Tab = createMaterialTopTabNavigator();

export const Coupons: React.FC = () => {

  const { user } = useContext(AuthContext)
  const [visibleModal, setVisibleModal] = useState(false);


  if (!user)
    return <CouponsEmpty />


  return (
    <SafeArea>
      <HeaderContainer>
        <ButtonCreateCoupon onPress={() => setVisibleModal(true)} />
      </HeaderContainer>

      <Tab.Navigator tabBarOptions={tabStyle} >
        <Tab.Screen name="Carteira" children={() => <CouponsWalletTab />} />
        <Tab.Screen name="Utilizados" children={() => <CouponsCheckout />} />
      </Tab.Navigator>
      <AddCouponModal visible={visibleModal} onClose={() => setVisibleModal(false)} isInfluencer={false} />
    </SafeArea>
  );
}

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/authContext';
import { CouponsCheckout } from '../../organisms/walletCouponsCheckoutTab';
import { CouponsEmpty } from '../../organisms/logoutCoupons';
import { CouponsWalletTab } from '../../organisms/walletCouponsTab';
import { SafeArea, tabStyle, HeaderContainer } from './styles';
import { ButtonCreateCoupon } from '../../components/buttonCoupon';
import { AddCouponModal } from '../../screensModals/addCouponModal';

const Tab = createMaterialTopTabNavigator();

export const Coupons: React.FC = () => {

  const { user } = useContext(AuthContext)
  const [visibleModal, setVisibleModal] = useState(false);


  if (!user)
    return <CouponsEmpty />


  return (
    <SafeArea>
      <AddCouponModal visible={visibleModal} onClose={() => setVisibleModal(false)} isInfluencer={false} />
      <HeaderContainer>
        <ButtonCreateCoupon onPress={() => setVisibleModal(true)} />
      </HeaderContainer>

      <Tab.Navigator tabBarOptions={tabStyle} >
        <Tab.Screen name="Carteira" children={() => <CouponsWalletTab />} />
        <Tab.Screen name="Utilizados" children={() => <CouponsCheckout />} />
      </Tab.Navigator>
    </SafeArea>
  );
}

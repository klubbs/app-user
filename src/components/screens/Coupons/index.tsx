import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../../contexts/auth-context';
import { CouponsCheckout } from '../../components_heavy/WalletCouponsCheckoutTab';
import { CouponsEmpty } from '../../components_heavy/LogoutCoupons';
import { CouponsWalletTab } from '../../components_heavy/WalletCouponsTab';
import { SafeArea, tabStyle, HeaderContainer } from './styles';
import { ButtonCreateCoupon } from '../../components/ButtonCoupon';
import { ModalAddCoupon } from '../../modals/modal-add-coupon';
import { IModalAddCouponRef } from '../../modals/modal-add-coupon/@types';

const Tab = createMaterialTopTabNavigator();

export const Coupons: React.FC = () => {

  const modalRef = useRef<IModalAddCouponRef>(null)
  const { user } = useContext(AuthContext)


  if (!user)
    return <CouponsEmpty />


  return (
    <SafeArea>
      <HeaderContainer>
        <ButtonCreateCoupon onPress={() => modalRef.current?.show()} />
      </HeaderContainer>

      <Tab.Navigator tabBarOptions={tabStyle} >
        <Tab.Screen name="Carteira de Cupons" children={() => <CouponsWalletTab />} />
        <Tab.Screen name="Checkouts" children={() => <CouponsCheckout />} />
      </Tab.Navigator>
      <ModalAddCoupon ref={modalRef} isInfluencer={false} />
    </SafeArea>
  );
}

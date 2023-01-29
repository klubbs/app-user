import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../../contexts/auth-context';
import { CheckoutsTab } from './more/checkoutsTab';
import { CouponsEmpty } from '../../components/LogoutCoupons';
import { CouponTab } from './more/couponTab';
import { SafeArea, tabStyle, HeaderContainer } from './styles';
import { ButtonCreateCoupon } from '../../components/ButtonCoupon';
import { ModalAddCoupon } from '../../modals/modal-add-coupon';
import { IModalAddCouponRef } from '../../modals/modal-add-coupon/@types';

const Tab = createMaterialTopTabNavigator();

export const WalletCoupons: React.FC = () => {
  const modalRef = useRef<IModalAddCouponRef>(null);
  const { user } = useContext(AuthContext);

  if (!user) return <CouponsEmpty />;

  return (
    <SafeArea>
      <HeaderContainer>
        <ButtonCreateCoupon onPress={() => modalRef.current?.show()} />
      </HeaderContainer>

      <Tab.Navigator tabBarOptions={tabStyle}>
        <Tab.Screen name="Carteira de Cupons" children={() => <CouponTab />} />
        <Tab.Screen name="Checkouts" children={() => <CheckoutsTab />} />
      </Tab.Navigator>
      <ModalAddCoupon ref={modalRef} isInfluencer={false} />
    </SafeArea>
  );
};

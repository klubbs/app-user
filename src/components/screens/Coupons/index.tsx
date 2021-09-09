import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/authContext';
import { CouponsCheckout } from '../../componentHeavy/walletCouponsCheckoutTab';
import { CouponsEmpty } from '../../componentHeavy/logoutCoupons';
import { CouponsWalletTab } from '../../componentHeavy/walletCouponsTab';
import { SafeArea, tabStyle, HeaderContainer } from './styles';
import colors from '../../../../assets/constants/colors';
import { ButtonCreateCoupon } from '../../component/buttonCoupon';
import { ModalComponent } from '../../component/modal';
import { ModalSaveCoupon } from '../../modals/modalAddCoupon';

const Tab = createMaterialTopTabNavigator();

export const Coupons: React.FC = () => {

  const { user } = useContext(AuthContext)
  const [visibleModal, setVisibleModal] = useState(false);


  if (!user)
    return <CouponsEmpty />


  return (
    <SafeArea>
      <ModalSaveCoupon visible={visibleModal} onClose={() => setVisibleModal(false)} isInfluencer={false} />
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

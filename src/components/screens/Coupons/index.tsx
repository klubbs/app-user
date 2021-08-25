import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/auth_context';
import { CouponsCheckout } from '../../component_heavy/coupons_checkout_tab';
import { CouponsEmpty } from '../../component_heavy/coupons_empty';
import { CouponsStorageTab } from '../../component_heavy/coupons_storage_tab';
import { SafeArea, tabStyle, Title, HeaderContainer } from './styles';
import colors from '../../../../assets/constants/colors';
import { ButtonCreateCoupon } from '../../component/button_cupon';
import { ModalComponent } from '../../component/modal';
import { ModalSaveCoupon } from '../../component_heavy/modal_save_coupon';

const Tab = createMaterialTopTabNavigator();

export const Coupons: React.FC = () => {

  const { user } = useContext(AuthContext)
  const [visibleModal, setVisibleModal] = useState(false);


  // if (!user)
  //   return <CouponsEmpty />


  return (
    <SafeArea>
      <ModalSaveCoupon visible={visibleModal} onClose={() => setVisibleModal(false)} />
      <HeaderContainer>
        <Title>Cupons</Title>
        <ButtonCreateCoupon onPress={() => setVisibleModal(true)} />
      </HeaderContainer>

      <Tab.Navigator tabBarOptions={tabStyle} >
        <Tab.Screen name="Armazenados" children={() => <CouponsStorageTab />} />
        <Tab.Screen name="Utilizados" children={() => <CouponsCheckout />} />
      </Tab.Navigator>
    </SafeArea>
  );
}

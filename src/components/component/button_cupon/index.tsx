import React from 'react';
import { SafeAreaView } from 'react-native';
import colors from '../../../../assets/constants/colors';
import { CouponIcon } from '../../../../assets/icons/coupon_icon';

import { Wrapper } from './styles';

export const ButtonCreateCoupon: React.FC<{ onPress: any, size?: number }> = (props) => {
  return (
    <Wrapper onPress={props.onPress} size={props.size}>
      <CouponIcon fill={colors.COLOR_YELLOW_BUTTON_TEXT} width={props.size ?? 22} height={props.size ?? 22} />
    </Wrapper >
  );
}

import React, { useEffect, useState } from 'react';
import { PressableProps } from 'react-native'
import colors from '../../../../assets/constants/colors';
import { CouponIcon } from '../../../../assets/icons/coupon_icon';
import { ICouponsItem } from '../../component_heavy/coupons_wallet_tab/interfaces';

import { Wrapper, BackgroundCoupon, CouponCode, CountCoupons, Container, OffCoupons, CouponContainer, Influencer, InfluencerEmpty } from './styles';


export const CouponWallet: React.FC<{ data: ICouponsItem } & PressableProps> = ({ onPress, onPressOut, onLongPress, onPressIn, data }) => {

  const [minOff, setMinOff] = useState(0)

  const couponsQtd = data.master_coupons.length
  const couponsActive = couponsQtd >= 1 ? true : false;

  useEffect(() => {

    if (couponsQtd >= 1) {
      const offValues = data.master_coupons.map(item => item.master_coupon_off_percentual);

      setMinOff(Math.min(...offValues))
    }

  }, [data])

  return (
    <Wrapper
      onLongPress={onLongPress}
      onPress={onPress}
      onPressOut={onPressOut}
      onPressIn={onPressIn}
    >
      <BackgroundCoupon active={couponsActive} />
      <Container>
        <CouponContainer>
          <CountCoupons>{couponsQtd} </CountCoupons>
          <CouponIcon width={10} height={10} fill={colors.COLOR_BLACK80} />
        </CouponContainer>
        <OffCoupons>+ {minOff}%</OffCoupons>
      </Container>
      {
        data.influencer_image
          ? <Influencer source={{ uri: 'https://i.ytimg.com/vi/g-r1ZyOD-H0/maxresdefault.jpg' }} />
          : <InfluencerEmpty>
            <CouponIcon width={20} height={20} fill={colors.COLOR_WHITE} style={{ left: '35%', top: '35%' }} />
          </InfluencerEmpty>
      }
      <CouponCode active={couponsActive}>{data.coupon_code}</CouponCode>
    </Wrapper >
  );
}

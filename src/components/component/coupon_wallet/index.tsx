import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import colors from '../../../../assets/constants/colors';
import { CouponIcon } from '../../../../assets/icons/coupon_icon';
import { ICouponsItem } from '../../component_heavy/coupons_wallet_tab/interfaces';

import { Wrapper, BackgroundCoupon, CouponCode, CountCoupons, Container, OffCoupons, CouponContainer } from './styles';


export const CouponWallet: React.FC<{ data: ICouponsItem }> = (props) => {

  const [minOff, setMinOff] = useState(0)

  useEffect(() => {

    if (props.data.master_coupons.length >= 1) {
      const offValues = props.data.master_coupons.map(item => item.master_coupon_off_percentual);

      setMinOff(Math.min(...offValues))
    }

  }, [props.data])

  return (
    <Wrapper>
      <BackgroundCoupon active={true} />
      <Container>
        <CouponContainer>
          <CountCoupons>{props.data.master_coupons.length} </CountCoupons>
          <CouponIcon width={10} height={10} fill={colors.COLOR_BLACK80} />
        </CouponContainer>
        <OffCoupons>+ {minOff}%</OffCoupons>
      </Container>
      <CouponCode>{props.data.coupon_code}</CouponCode>
    </Wrapper>
  );
}

import React, { useEffect, useState } from 'react';
import { ICouponProps } from './@types';
import {
  MotifiedWrapper,
  BackgroundCoupon,
  CouponCode,
  CountCoupons,
  Container,
  OffCoupons,
  CouponContainer,
  Influencer,
  InfluencerEmpty,
  ShopSubtitleIcon,
  CouponDefaultImage
} from './styles';

export const Coupon: React.FC<ICouponProps> = (props) => {

  const [minOff, setMinOff] = useState(0)

  const couponsQtd = props.data.master_coupons?.length
  const couponsActive = defineIsActive()

  function defineIsActive() {

    if (!props.toggle) {
      if (couponsQtd >= 1) {
        return true
      }

      return false
    } else {
      if (props.isActiveByToggle)
        return true
      else
        return false
    }

  }

  useEffect(() => {

    if (couponsQtd >= 1) {
      const offValues = props.data.master_coupons.map(item => item.master_coupon_off_percentual);

      setMinOff(Math.min(...offValues) ?? 0)
    }

  }, [props.data])

  return (
    <MotifiedWrapper
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 400 }}
      onLongPress={props.onLongPress}
      onPress={props.onPress}
      onPressOut={props.onPressOut}
      onPressIn={props.onPressIn}
    >
      <BackgroundCoupon active={couponsActive} />
      <Container>
        <CouponContainer>
          <CountCoupons>{couponsQtd}</CountCoupons>
          <ShopSubtitleIcon />
        </CouponContainer>
      </Container>
      {
        props.data.influencer_image
          ? <Influencer source={{ uri: props.data.influencer_image }} />
          : <InfluencerEmpty>
            <CouponDefaultImage />
          </InfluencerEmpty>
      }
      <CouponCode active={couponsActive}>{props.data.coupon_code}</CouponCode>
    </MotifiedWrapper >
  );
}

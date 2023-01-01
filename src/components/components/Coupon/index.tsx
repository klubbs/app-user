import React from 'react';
import { ICouponProps } from './@types';
import {
  MotifiedWrapper,
  BackgroundCoupon,
  CouponCode,
  CountCoupons,
  Container,
  CouponContainer,
  Influencer,
  InfluencerEmpty,
  ShopSubtitleIcon,
  CouponDefaultImage,
} from './styles';

const CODE_COUPONS_SIZE = 12;

export const Coupon: React.FC<ICouponProps> = (props) => {
  const offersCount = props.data.offers?.length;

  function formattedCouponCode() {
    return `${props.data.coupon_code.substring(0, CODE_COUPONS_SIZE)}${
      props.data.coupon_code.length > CODE_COUPONS_SIZE ? '...' : ''
    }`;
  }

  function isActiveCoupon() {
    if (!props.toggle) {
      if (offersCount >= 1) {
        return true;
      }

      return false;
    } else {
      if (props.isActiveByToggle) return true;
      else return false;
    }
  }

  function RenderInfluencerImage() {
    if (props.data.partner_image) {
      return <Influencer source={{ uri: props.data.partner_image }} />;
    }

    return (
      <InfluencerEmpty>
        <CouponDefaultImage />
      </InfluencerEmpty>
    );
  }

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
      <BackgroundCoupon active={isActiveCoupon()} />
      <Container>
        <CouponContainer>
          <CountCoupons>{offersCount}</CountCoupons>
          <ShopSubtitleIcon />
        </CouponContainer>
      </Container>
      <RenderInfluencerImage />
      <CouponCode putMarginBottom={props.toggle} active={isActiveCoupon()}>
        {formattedCouponCode()}
      </CouponCode>
    </MotifiedWrapper>
  );
};

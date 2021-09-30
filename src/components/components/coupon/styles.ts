import { Skeleton } from '@motify/skeleton';
import { motify, MotiImage, MotiView } from 'moti'
import styled from "styled-components/native";
import colors from '../../../../assets/constants/colors';
import COLORS from "../../../../assets/constants/colors";
import { CouponIcon } from "../../../../assets/icons/coupon_icon";
import { ShopIcon } from '../../../../assets/icons/shop_icon';
import { CouponWalletBackground } from "../../../../assets/images/coupons/walletCoupon";


const Wrapper = styled.Pressable`
  height:200px;
  width:180px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom:4.5%;
`

export const MotifiedWrapper = motify(Wrapper)()


export const BackgroundCoupon = styled(CouponWalletBackground).attrs(props => ({
  height: 200,
  width: '90%'
})) <{ active: boolean }>`
  position: absolute;
  right: 5%;
  top: 0;
  bottom: 0;
  align-self: center;
`

export const CouponCode = styled.Text<{ active: boolean }>`
  color:${props => props.active ? COLORS.COLOR_YELLOW_BUTTON_TEXT : COLORS.COLOR_BLACK80};
  font-size:14px;
  font-family:'Nunito_SemiBold';
`;

export const Container = styled.View`
  flex-direction:row;
  align-items:center;
  justify-content: space-around;
  height:15%;
  width:100%;
  position:absolute;
  top:15px;
`

export const CouponContainer = styled.View`
  flex-direction:row;
  align-items: center;
`

export const CountCoupons = styled.Text`
  color:${COLORS.COLOR_BLACK80};
  font-size:12px;
  font-family:'Nunito_Bold';
`

export const OffCoupons = styled.Text`
color:${COLORS.COLOR_BLACK80};
font-size:12px;
font-family:'Nunito_Bold';
/* left:380%; */
`

export const Influencer = styled(MotiImage).attrs(props => ({
  from: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  transition: {
    type: 'timing',
    duration: 350
  }
}))`
  width:80px;
  height:80px;
  border-radius: 40px;
  bottom:18%;
  border-width: 2px;
  border-color: ${colors.COLOR_WHITE};
`

export const InfluencerEmpty = styled(MotiView).attrs(props => ({
  from: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  transition: {
    type: 'timing',
    duration: 350
  }
}))`
  width:80px;
  height:80px;
  border-radius: 40px;
  bottom:20%;
  background-color: ${colors.COLOR_WHITE_40};
`

export const ShopSubtitleIcon = styled(ShopIcon).attrs(props => ({
  width: 10,
  height: 10,
  fill: colors.COLOR_BLACK80,
}))`
  margin-left:5px;
`


export const CouponDefaultImage = styled(CouponIcon).attrs(props => ({
  width: 20,
  height: 20,
  fill: colors.COLOR_WHITE
}))`
  left: 35%;
  top: 35%;
`

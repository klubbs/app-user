import styled from "styled-components/native";
import COLORS from "../../../../assets/constants/colors";
import { CouponIcon } from "../../../../assets/icons/coupon_icon";
import { CouponWalletBackground } from "../../../../assets/images/coupon_wallet_background";

export const Wrapper = styled.View`
  height:200;
  width:48%;
  align-items: center;
  justify-content: flex-end;
  padding-bottom:4.5%;
`

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

export const CouponCode = styled.Text`
  color:${COLORS.COLOR_YELLOW_BUTTON_TEXT};
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

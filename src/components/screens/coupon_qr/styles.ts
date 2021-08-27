import styled from 'styled-components/native';
import { Dimensions, StyleSheet } from 'react-native'
import colors from '../../../../assets/constants/colors';
import { QrCouponBackground } from '../../../../assets/images/qr_coupon_background';
import { LikeUpIcon } from '../../../../assets/icons/like_up_icon';

const { width, height } = Dimensions.get('window');

export const Wrapper = styled.SafeAreaView`
  background-color: ${colors.COLOR_YELLOW};
  justify-content: center;
  align-items: center;
  flex:1;
`

export const TopContainer = styled.View`
  flex: 1.4;
  width: 100%;
  padding-top: 9%;
  justify-content: center;
  align-items: center;

`

export const BottomContainer = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
`

export const Off = styled.Text`
  color:${colors.COLOR_BLACK80};
  font-size:40px;
  font-family:'Nunito_ExtraBold';
`

export const Establishment = styled.Text`
  color:${colors.COLOR_SECUNDARY_BLACK};
  font-size:30px;
  margin-top: 5%;
  font-family:'Nunito_Bold';
`

export const Influencer = styled.Text`
  color:${colors.COLOR_BLACK50};
  font-size:20px;
  font-family:'Nunito_Regular';
`

export const ValidAt = styled.Text`
  color:${colors.COLOR_BLACK80};
  top: 12%;
  font-size:12px;
  font-family:'Nunito_Light';
`

export const BackgroundCoupon = styled(QrCouponBackground).attrs(props => ({
  height: height,
  width: width - 40
}))`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  align-self: center;
  left: 5%;
`

export const InfluencerIcon = styled(LikeUpIcon).attrs(props => ({
  width: 15,
  height: 15,
  fill: colors.COLOR_BLACK50
}))`
margin-right: 5px;
`

export const InfluencerContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const SubtitleHelp = styled.Text`
  color:${colors.COLOR_WHITE_80};
  position: absolute;
  bottom: 12%;
  font-size:15px;
  font-family:'Nunito_Bold';
`

export const ImageEstablishment = styled.Image`
  position: absolute;
  z-index:10;
  top:13.5%;
  height:60px;
  width: 60px;
  border-radius:30px;
`

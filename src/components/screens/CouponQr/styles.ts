import styled from 'styled-components/native';
import { Dimensions, StyleSheet } from 'react-native'
import colors from '../../../../assets/constants/colors';
import { QrCouponBackground } from '../../../../assets/images/backgrounds/backgroundQrCoupon';
import { LikeUpIcon } from '../../../../assets/icons/like_up_icon';
import { MotiView } from 'moti'

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
  padding-top: ${height < 700 ? '2%' : '9%'};
  justify-content: center;
  align-items: center;

`

export const BottomContainer = styled.View`
  flex: 1;
  align-items: center;
  width: 90%;
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

export const SubtitleHelp = styled.Text`
  color:${colors.COLOR_WHITE_80};
  position: absolute;
  margin-top: 65%;
  font-size:14px;
  font-family:'Nunito_Bold';
`
export const EmptyImage = styled.View`
  position: absolute;
  align-items:center;
  justify-content: center;
  z-index:10;
  top:${height > 700 ? '13.5%' : '6%'};
  height:50px;
  width: 50px;
  border-radius:25px;
  background-color: ${colors.COLOR_SECUNDARY_WHITE};
`

export const ImageInfluencer = styled.Image`
  position: absolute;
  z-index:10;
  top:${height > 700 ? '13.5%' : '6%'};
  height:60px;
  width: 60px;
  border-radius:30px;
`

export const FlatListComponent = styled.FlatList.attrs(props => ({
  horizontal: true,
  contenContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center', paddingLeft: 30
  },
  showsHorizontalScrollIndicator: false

}))``

export const AnimatedWrapper = styled(MotiView).attrs(props => ({
  from: { left: 800 },
  animate: { left: 0 },
  transition: { type: 'spring', duration: 1000 }

}))``

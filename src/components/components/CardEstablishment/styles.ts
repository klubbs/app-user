import styled from 'styled-components/native'
import { Animated, Platform } from 'react-native'
import { colors } from '../../../../assets/constants/colors'
import { isIphoneX, isBiggerAndroid } from '../../../utils/dimensions'
import { ShopIcon } from '../../../../assets/icons/shop_icon'

const BORDER_SPACING = '5px';

export const Wrapper = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.95
}
))`
    height: 250px;
    width: ${isIphoneX() ? '48%' : '48%'};
    align-items: center;
`

export const Image = Animated.createAnimatedComponent(styled.Image.attrs(props => ({
}))
  `
  height: 100px;
  width: ${Platform.select({
    ios: '100%',
    android: isBiggerAndroid() ? '190px' : '160px'
  })};
  border-radius: ${BORDER_SPACING};
  `
)

export const EmptyImage = styled.View`
  height: 100px;
  width: ${Platform.select({
  ios: '100%',
  android: isBiggerAndroid() ? '190px' : '160px'
})};
  justify-content:center;
  align-items:center;
  border-radius: ${BORDER_SPACING};
  background-color:${colors.COLOR_BLACK10}
`
export const EmptyShopIcon = styled(ShopIcon).attrs(props => ({
  width: 20,
  height: 20,
  fill: colors.COLOR_BLACK40
}))``


export const Container = styled.View`
    align-items: flex-start;
    height: 100px;
    width: 100%;
`

export const ContainerDescriptions = styled.View`
  flex:3;
  padding-top: 2%;
  align-items: flex-start;
  justify-content: flex-start;
`

export const EstablishmentName = styled.Text`
  color:${colors.COLOR_SECUNDARY_BLACK};
  font-size:16px;
  font-family:'Nunito_Bold';
  margin-bottom: 1%;
`;

export const StablishmentCategory = styled.Text`
  color:${colors.COLOR_BLACK50};
  font-size:12px;
  font-family:'Nunito_Light';
`;

export const ContainerToolbar = styled.View`
  flex:2;
  width: 100%;
  background-color: ${colors.COLOR_BLACK};
  border-radius:  ${BORDER_SPACING};
  justify-content: flex-start;
  padding-horizontal:5px;
  align-items: center;
  flex-direction: row;
`

const ToolbarBadgeDefault = styled.View`
  width: 30%;
  height: 80%;
  margin-right: 8px;
`

export const ContainerOff = styled(ToolbarBadgeDefault)`
  background-color: ${colors.COLOR_SECUNDARY_BLACK};
  border-radius:  ${BORDER_SPACING};
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
`

export const ContainerDistance = styled(ToolbarBadgeDefault)`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`

export const OffCoupon = styled.Text`
  color:${colors.COLOR_YELLOW};
  font-size:11px;
  font-family:'Nunito_Bold';
`;

export const DistanceLocation = styled.Text`
  color:${colors.COLOR_WHITE_80};
  font-size:10px;
  font-family:'Nunito_Regular';
`;

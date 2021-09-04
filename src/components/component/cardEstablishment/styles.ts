import { MotiView, motify } from 'moti'
import styled from 'styled-components/native'
import { Animated } from 'react-native'
import colors from '../../../../assets/constants/colors'
import COLORS from '../../../../assets/constants/colors'
import { isIphoneX } from '../../../utils/iphoneHelper'
import { ShopIcon } from '../../../../assets/icons/shop_icon'
import FastImage from 'react-native-fast-image'

export const Wrapper = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.95
}
))`
    height: 250px;
    width: ${isIphoneX() ? '190px' : '175px'};
    align-items: center;
`

export const Image = Animated.createAnimatedComponent(styled(FastImage).attrs(props => ({
}))
  `
  height: 100px;
  width: 190px;
  border-radius: 10;
  `
)
export const OpenIndicator = Animated.createAnimatedComponent(styled.View.attrs(props => ({
  /* from: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { type: 'timing' } */
})) <{ open: boolean }>`
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  z-index:10;
  top:5%;
  right:-48%;
  border-width: 1px;
  border-color: ${COLORS.COLOR_WHITE};
  background-color: ${props => props.open ? colors.COLOR_GREEN : colors.COLOR_RED};
`
)

export const EmptyImage = styled.View`
  height: 100px;
  width: 190px;
  justify-content:center;
  align-items:center;
  border-radius: 10px;
  background-color:${colors.COLOR_BLACK10}
`
export const EmptyShopIcon = styled(ShopIcon).attrs(props => ({
  width: 20,
  height: 20,
  fill: colors.COLOR_BLACK40
}))``


export const Container = styled.View`
    align-items: flex-start;
    height: 120px;
    width: 100%;
`

export const ContainerDescriptions = styled.View`
  flex:4;
  padding-top: 2%;
  align-items: flex-start;
  justify-content: flex-start;
`

export const EstablishmentName = styled.Text`
  color:${COLORS.COLOR_SECUNDARY_BLACK};
  font-size:16px;
  font-family:'Nunito_Bold';
  margin-bottom: 1%;
`;

export const StablishmentCategory = styled.Text`
  color:${COLORS.COLOR_BLACK50};
  font-size:12px;
  font-family:'Nunito_Light';
`;

export const ContainerToolbar = styled.View`
  flex:2;
  width: 100%;
  background-color: ${COLORS.COLOR_BLACK};
  border-radius: 10px;
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
  background-color: ${COLORS.COLOR_SECUNDARY_BLACK};
  border-radius: 10px;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
`

export const ContainerDistance = styled(ToolbarBadgeDefault)`
  justify-content: space-between;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
`

export const OffCoupon = styled.Text`
  color:${COLORS.COLOR_YELLOW};
  font-size:11px;
  font-family:'Nunito_Bold';
`;

export const DistanceLocation = styled.Text`
  color:${COLORS.COLOR_WHITE_80};
  font-size:10px;
  font-family:'Nunito_Regular';
`;

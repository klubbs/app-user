import styled from 'styled-components/native'
import COLORS from '../../../../assets/constants/colors'
import { ShopIcon } from '../../../../assets/icons/shop_icon';


export const Wrapper = styled.Pressable`
    width: 150px;
    margin: 10px;
    height:140px;
    align-items: center;
    align-items: flex-start;
`

export const EstablishmentImage = styled.Image`
    align-items: flex-start;
    flex:2;
    border-radius: 10px;
    width: 100%;
    bottom:5px;
`

export const EmptyImage = styled.View`
    align-items:center;
    justify-content:center;
    flex:2;
    border-radius: 10px;
    width: 100%;
    bottom:5px;
    background-color: ${COLORS.COLOR_BLACK10};
`

export const EmptyIcon = styled(ShopIcon).attrs(props => ({
  fill: COLORS.COLOR_BLACK40,
  width: 40,
  height: 40
}))``

export const ContainerToolbar = styled.View`
  flex:0.65;
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

export const OffCoupon = styled.Text`
  color:${COLORS.COLOR_YELLOW};
  font-size:11px;
  font-family:'Nunito_Bold';
`;

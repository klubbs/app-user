import styled from 'styled-components/native'
import COLORS from '../../../../assets/constants/colors'
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

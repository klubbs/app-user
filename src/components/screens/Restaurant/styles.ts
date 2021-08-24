import styled from 'styled-components/native'
import COLORS from '../../../../assets/constants/colors'


export const Wrapper = styled.View`
  flex: 1;
  background-color: ${COLORS.COLOR_SECUNDARY_WHITE};
`

export const ContainerImage = styled.Image`
  flex: 0.4;
`

export const ContainerInformations = styled.View`
  flex: 1;
  background-color: ${COLORS.COLOR_WHITE};
`

export const ContainerBadges = styled.View`
  flex-direction: row;
  margin-top: 8%;
  justify-content: space-evenly;
`

export const ContainerUsual = styled.View`
  flex-direction: row;
  margin-top: 30px;
  justify-content: center;
`


export const ContainerGetCoupon = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.6
}))`
  flex: 0.2;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.COLOR_YELLOW};
`

export const GetCouponText = styled.Text`
  color:${COLORS.COLOR_WHITE};
  font-size:18px;
  font-family:'Nunito_Bold';
`
export const RestaurantName = styled.Text`
  color:${COLORS.COLOR_SECUNDARY_BLACK};
  font-size:20px;
  font-family:'Nunito_Bold';
`;

export const RestaurantCategory = styled.Text`
  color:${COLORS.COLOR_BLACK80};
  font-size:15px;
  font-family:'Nunito_Light';
`;

export const ContainerIcons = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-evenly;
`;


export const ContainerDescription = styled.View`
  flex: 1;
  left: 20;
`;


export const WrapperTop = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  top: 10;
`;


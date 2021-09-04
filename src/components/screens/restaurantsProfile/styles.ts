import styled from 'styled-components/native'
import colors from '../../../../assets/constants/colors'
import COLORS from '../../../../assets/constants/colors'


export const Wrapper = styled.View`
  flex: 1;
  background-color: ${COLORS.COLOR_SECUNDARY_WHITE};
`

export const ContainerImage = styled.Image`
  flex: 0.4;
  border-radius:10px;
`

export const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.COLOR_WHITE};
`


export const ContainerUsual = styled.View`
  flex-direction: row;
  margin-top: 30px;
  justify-content: center;
  flex:1;
  background-color: ${colors.COLOR_WHITE};
`


export const ContainerGetCoupon = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.6
}))`
  flex: 0.2;
  align-items: center;
  justify-content: center;
  border-radius:10px;
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
  font-size:12px;
  font-family:'Nunito_Light';
`;



export const WrapperTop = styled.View`
  top: 10px;
  left: 20px;
`;


export const BlocksWrapper = styled.View`
  align-items:center;
  justify-content: center;
  flex:1;
  height:80px;
`
export const BlocksValue = styled.Text`
  color:${COLORS.COLOR_BLACK80};
  font-size:14px;
  margin-top:5px;
  font-family:'Nunito_Bold';
`



export const Description = styled.Text`
  color:${COLORS.COLOR_BLACK80};
  font-size:13px;
  font-family:'Nunito_Regular';
  letter-spacing: 0.5px;
`

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
  padding:20px;
  background-color: ${COLORS.COLOR_WHITE};
`


export const IconsContainer = styled.View`
  flex-direction: row;
  margin-top: 30px;
  justify-content: center;
  flex:1;
`


export const ContainerGetCoupon = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.6
}))`
  flex: 0.2;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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

export const AboutSubtitle = styled.Text`
  color:${COLORS.COLOR_BLACK80};
  font-size:16px;
  margin-top:10%;
  font-family:'Nunito_Bold';
`;

export const About = styled.Text`
  color:${COLORS.COLOR_BLACK50};
  font-size:14px;
  margin-top:5%;
  letter-spacing: 0.5px;
  font-family:'Nunito_Regular';
`;



export const NameContainer = styled.View`
  top: 10px;
  `;


export const BlocksWrapper = styled.View`
  align-items:center;
  flex-direction: row;
  justify-content: center;
  flex:1;
`
export const BlocksValue = styled.Text`
  color:${COLORS.COLOR_YELLOW};
  margin-left: 5px;
  font-size:14px;
  font-family:'Nunito_Bold';
`

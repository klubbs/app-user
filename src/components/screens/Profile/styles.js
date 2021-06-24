import styled from 'styled-components';
import COLORS from '../../../../assets/constants/colors';


export const ContainerPoints = styled.View`
  border-left-width: 0.8;
  border-left-color: ${COLORS.COLOR_BLACK20};
  flex: 1;
  height: 20%;
  margin-left: 5%;
  justify-content: center;
  padding-left: 10%;
`;

export const UserImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  z-index: 10px;
`;

export const ContainerImage = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
`;

export const ImageBorder = styled.View`
  width: 115px;
  height: 115px;
  border-radius: 57.5px;
  border-width: 5px;
  border-right-color: ${COLORS.COLOR_YELLOW};
  border-bottom-color: ${COLORS.COLOR_YELLOW};
  border-color: transparent;
  justify-content: center;
  align-items: center;
`;


export const WrapperTop = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const PointValues = styled.Text`
  color:${COLORS.COLOR_SECUNDARY_BLACK};
  font-size:14px;
  font-family:'Nunito_Bold';
`

export const Point = styled.Text`
  color:${COLORS.COLOR_BLACK80};
  font-size:14px;
  font-family:'Nunito_Regular';
`


export const MenuItemArrow = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.COLOR_BLACK10};
`;


export const MenuItemIcon = styled.View`
  background-color: ${`${COLORS.COLOR_YELLOW}40`};
  width: 55px;
  height: 55px;
  border-radius: 27.5px;
  justify-content: center;
  align-items: center;
`;


export const MenuItemContainer = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8
}))`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

export const MenuText = styled.Text`
  color:${COLORS.COLOR_SECUNDARY_BLACK};
  font-size:16px;
  font-family:'Nunito_SemiBold';
`
export const MenuTextDescription = styled.Text`
  color:${COLORS.COLOR_BLACK50};
  font-size:14px;
  font-family:'Nunito_Regular';
`
export const MenuTextContainer = styled.View`
  flex: 1;
  align-items: flex-start;
  padding-left: 5%;
`


export const MenuLogoutContainer = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8
}))`
  margin-top: 50px;
  padding-left: 2%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 15%;
`;

export const MenuTextLogout = styled.Text`
  color:${COLORS.COLOR_BLACK40};
  font-size:16px;
  font-family:'Nunito_Regular';
`



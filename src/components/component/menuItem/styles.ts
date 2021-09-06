import styled from 'styled-components/native';
import COLORS from '../../../../assets/constants/colors';
import { Feather } from '@expo/vector-icons';
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

export const MenuItemIcon = styled.View`
  background-color: ${`${COLORS.COLOR_YELLOW}40`};
  width: 55px;
  height: 55px;
  border-radius: 27.5px;
  justify-content: center;
  align-items: center;
`;

export const MenuItemArrow = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.COLOR_BLACK10};
`;


export const ArrowRight = styled(Feather).attrs(props => ({
  name: "chevron-right",
  size: 18,
  colors: COLORS.COLOR_SECUNDARY_BLACK
}))``

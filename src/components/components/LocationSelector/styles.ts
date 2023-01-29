import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';

export const Container = styled.View`
  flex-direction: row;
`;

export const CityTitle = styled.Text`
  color: ${colors.COLOR_SECUNDARY_BLACK};
  font-size: 15px;
  margin-right: 5px;
  font-family: 'Nunito_Bold';
  text-align: flex-start;
`;
export const CityTouchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  background-color: ${colors.COLOR_YELLOW};
  width: 20px;
  height: 20px;
  border-radius: 2.5px;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
`;

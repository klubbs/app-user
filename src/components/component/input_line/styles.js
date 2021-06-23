import { TextInput } from 'react-native';
import styled from 'styled-components';
import COLORS from '../../../../assets/constants/colors';

export const ContainerInput = styled(TextInput).attrs(() => ({
  selectionColor: COLORS.COLOR_YELLOW,
  placeholderTextColor: COLORS.COLOR_WHITE_40
}))`
	height: 60px;
  width: 90%;
  border-width: 1.2px;
  border-radius: 6px;
  border-color: ${COLORS.COLOR_WHITE_40};
	font-size: 18px;
	color: ${COLORS.COLOR_YELLOW};
  font-family:'Nunito_Regular';
  padding-left:10px;
`;

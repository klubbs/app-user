import { TextInput } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';

export const ContainerInput = styled(TextInput).attrs(() => ({
  selectionColor: colors.COLOR_YELLOW,
  placeholderTextColor: colors.COLOR_WHITE_40
}))`
	height: 60px;
  width: 90%;
  border-width: 1.2px;
  border-radius: 6px;
  border-color: ${colors.COLOR_WHITE_40};
	font-size: 18px;
	color: ${colors.COLOR_YELLOW};
  font-family:'Nunito_Regular';
  padding-left:10px;
`;

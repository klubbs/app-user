import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';

export const Input = styled.TextInput.attrs({
  placeholder: 'Busque por restaurante ou prato',
  placeholderTextColor: colors.COLOR_BLACK20,
  keyboardType: 'default',
  returnKeyType: 'done',
  textAlign: 'center',
  selectionColor: colors.COLOR_YELLOW,
})`
  width: 100%;
  height: 40px;
  font-size: 13px;
  font-family: 'Nunito_Light';
  color: ${colors.COLOR_BLACK80};
  border-radius: 10px;
  background-color: ${colors.COLOR_BLACK5};
  border-color: ${colors.COLOR_BLACK5};
  border-width: 1px;
`;

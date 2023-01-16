import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';
import { MotiPressable } from 'moti/interactions';

export const SearchPressable = styled(MotiPressable).attrs({
  containerStyle: { alignSelf: 'flex-start' },
})`
  height: 35px;
  background-color: ${colors.COLOR_BLACK10};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

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
  font-family: 'Nunito_SemiBold';
  color: ${colors.COLOR_BLACK80};
  background-color: transparent;
`;

export const ContainerLocation = styled.View`
  flex: 5;
  flex-direction: row;
  justify-content: flex-start;
`;

export const ContainerSearch = styled.View`
  flex: 3.4;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

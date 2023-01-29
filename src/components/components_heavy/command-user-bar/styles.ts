import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';
import { MotiPressable } from 'moti/interactions';
import { Feather } from '@expo/vector-icons';

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
  placeholder: 'Busque por estabelecimento',
  placeholderTextColor: colors.COLOR_BLACK40,
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
  justify-content: flex-end;
`;

export const ContainerSearch = styled.View`
  flex: 3.4;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

export const Container = styled.View`
  width: 100%;
  height: 100%;
`;

export const ContainerInTop = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SubtitleSearch = styled.Text`
  top: 5%;
  font-size: 12px;
  font-family: 'Nunito_Light';
  color: ${colors.COLOR_BLACK40};
`;

export const SearchValue = styled.Text`
  font-size: 13px;
  font-family: 'Nunito_SemiBold';
  color: ${colors.COLOR_SECUNDARY_BLACK};
`;

export const ConfirmPressableSearch = styled.TouchableOpacity`
  top: 10%;
`;

export const XCircle = styled(Feather).attrs({
  name: 'x-circle',
  size: 16,
  color: colors.COLOR_BLACK40,
})``;

export const SearchIcon = styled(Feather).attrs({
  name: 'search',
  size: 16,
  color: colors.COLOR_BLACK40,
})``;

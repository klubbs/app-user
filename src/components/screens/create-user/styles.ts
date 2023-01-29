import { Dimensions, Platform, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';
import Input from '../../components/Input';
import { TextInputMask } from 'react-native-masked-text';

const WIDTH_DIMENSION = Dimensions.get('window').width;

export const Wrapper = styled.SafeAreaView`
  background-color: ${colors.COLOR_SECUNDARY_BLACK};
  flex: 1;
`;

export const ContainerTop = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const ContainerMiddle = styled(View)`
  flex: 4;
`;

export const ContainerScrool = styled.View`
  width: ${WIDTH_DIMENSION};
  justify-content: center;
  align-items: center;
`;

export const ContainerBottom = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${colors.COLOR_WHITE};
  font-size: 20px;
  font-family: 'Nunito_Bold';
`;

export const Description = styled.Text`
  color: ${colors.COLOR_WHITE_80};
  font-size: 16px;
  font-family: 'Nunito_Regular';
  text-align: center;
`;

export const SubtitlePassword = styled.Text`
  color: ${colors.COLOR_WHITE_80};
  font-size: 12px;
  margin-top: 10px;
  font-family: 'Nunito_Light';
  text-align: center;
`;

export const Confirm = styled(TouchableOpacity).attrs(() => ({
  activeOpacity: 0.8,
}))`
  width: 80px;
  height: 80px;
  background-color: ${colors.COLOR_YELLOW};
  border-radius: 40px;
  justify-content: center;
  align-items: center;
`;

export const Name = styled(Input).attrs((props) => ({
  placeHolder: 'Como podemos te chamar?',
  keyboardType: 'default',
  contentType: 'name',
}))<{ error: any }>`
  margin-bottom: 10%;
  border-color: ${(props) => (props.error ? colors.COLOR_RED : colors.COLOR_WHITE_40)};
`;

//TODO:Passar para um componente essas props
export const Phone = styled(TextInputMask).attrs({
  type: 'cel-phone',
  placeholder: 'Telefone',
  placeholderTextColor: colors.COLOR_WHITE_40,
  selectionColor: colors.COLOR_YELLOW,
  returnKeyType: 'done',
})<{ error: any }>`
  border-color: ${(props) => (props.error ? colors.COLOR_RED : colors.COLOR_WHITE_40)};
  height: 60px;
  width: 90%;
  border-width: 1.2px;
  border-radius: 6px;
  font-size: 18px;
  color: ${colors.COLOR_YELLOW};
  font-family: 'Nunito_Regular';
  padding-left: 10px;
`;

export const Password = styled(Input).attrs((props) => ({
  placeHolder: 'Senha',
  keyboardType: 'ascii-capable',
  contentType: 'password',
  isPassword: true,
}))<{ error: any }>`
  border-color: ${(props) => (props.error ? colors.COLOR_RED : colors.COLOR_WHITE_40)};
`;

export const containerBackButton = {
  width: '20%',
  height: 60,
  paddingTop: 22,
  textAlign: 'center',
};

export const WrapperKeyboard = styled.KeyboardAvoidingView.attrs((props) => ({
  behavior: Platform.OS == 'ios' ? 'padding' : 'height',
}))`
  flex: 5;
`;

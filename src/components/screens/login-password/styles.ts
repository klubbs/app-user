import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';

export const Wrapper = styled.SafeAreaView`
  background-color: ${colors.COLOR_SECUNDARY_BLACK};
  flex: 1;
`

export const ContainerTop = styled.View`
  flex: 1 ;
  top: 10%;
  align-items: center;
`

export const ContainerBottom = styled.View`
  flex: 1 ;
  justify-content: space-between;
  align-items: center;
`
export const Title = styled.Text`
  color:${colors.COLOR_WHITE};
  font-size:20px;
  font-family:'Nunito_Bold';`

export const Description = styled.Text`
  color:${colors.COLOR_SECUNDARY_WHITE_60};
  font-size:16px;
  font-family:'Nunito_Regular';
  text-align: center;
`

export const EnterButton = styled(Button).attrs(props => ({
  text: 'Entrar',
  styleContainer: { width: '60%', marginBottom: '5%' }
}))``


export const WrapperKeyboard = styled.KeyboardAvoidingView.attrs(props => ({
  behavior: Platform.OS == 'ios' ? 'padding' : 'height',
}))`
  flex:1
`

export const PasswordInput = styled(Input).attrs(props => ({
  placeHolder: "senha",
  isPassword: true,
  keyboardType: "default"
}))`
`

export const ForgotPasswordTouch = styled.TouchableOpacity`
  justify-content:center;
  align-items:center;
  width:100%;
`

export const ForgotPasswordSubtitle = styled.Text`
  color:${colors.COLOR_WHITE_80};
  font-size:12px;
  font-family:'Nunito_Light';
`

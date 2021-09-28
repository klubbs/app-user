import styled from 'styled-components/native';
import COLORS from '../../../../assets/constants/colors';
import { BEHAVIOR_KEYBOARD } from '../../../utils/behaviorUtils';
import Button from '../../components/button';
import Input from '../../components/inputLine';

export const Wrapper = styled.SafeAreaView`
  background-color: ${COLORS.COLOR_SECUNDARY_BLACK};
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
  color:${COLORS.COLOR_WHITE};
  font-size:20px;
  font-family:'Nunito_Bold';`

export const Description = styled.Text`
  color:${COLORS.COLOR_SECUNDARY_WHITE_60};
  font-size:16px;
  font-family:'Nunito_Regular';
  text-align: center;
`

export const EnterButton = styled(Button).attrs(props => ({
  text: 'Entrar',
  styleContainer: { width: '60%', marginBottom: '5%' }
}))``


export const WrapperKeyboard = styled.KeyboardAvoidingView.attrs(props => ({
  behavior: BEHAVIOR_KEYBOARD,
}))`
  flex:1
`

export const PasswordInput = styled(Input).attrs(props => ({
  placeHolder: "senha",
  isPassword: true,
  keyboardType: "default"
}))`
`

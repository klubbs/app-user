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
  justify-content: flex-end;
  align-items: center;
`

export const ContainerBottom = styled.View`
  flex: 6 ;
  justify-content: flex-end;
  align-items: center;
`

export const Title = styled.Text`
  color:${COLORS.COLOR_WHITE};
  font-size:20px;
  font-family:'Nunito_Bold';
`

export const Description = styled.Text`
  color:${COLORS.COLOR_WHITE_80};
  font-size:16px;
  font-family:'Nunito_Regular';
  text-align: center;
`


export const Subtitle = styled.Text`
  color:${COLORS.COLOR_WHITE_40};
  font-size:14px;
  margin-top:10px;
  font-family:'Nunito_Light';
  text-align: center;
`


export const ExplainText = styled.Text`
  color:${COLORS.COLOR_WHITE_80};
  font-size:13px;
  font-family:'Nunito_Light';
  text-align: center;
  margin-bottom: 5%;
`
export const EnterButton = styled(Button).attrs(props => ({
  text: 'Entrar',
  styleContainer: { marginBottom: '5%' }
}))``

export const WrapperKeyboard = styled.KeyboardAvoidingView.attrs(props => ({
  behavior: BEHAVIOR_KEYBOARD,
}))`
  flex:1
`

export const WrapperImage = styled.ImageBackground.attrs(props => ({
  source: require('../../../../assets/images/welcome-login-icons.png')
}))`
  width:95%;
  height:40%;
  justify-content: center;
  align-items:center;
  margin-bottom:25%;
`

export const MailInput = styled(Input).attrs(props => ({
  placeHolder: "e-mail de login",
  keyboardType: "email-address"
}))`
  margin-bottom:5%;
`

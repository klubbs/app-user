import styled from 'styled-components/native';
import COLORS from '../../../../assets/constants/colors';
import Button from '../../components/Button';

export const Wrapper = styled.SafeAreaView`
  flex:1;
  background-color: ${COLORS.COLOR_WHITE};
  align-items: center;
  margin-bottom: 40px;
`

export const UnregisterBoxText = styled.View`
  background-color: ${COLORS.COLOR_BLACK5};
  align-items: center;
  justify-content: center;
  margin-top: 20%;
  width: 90%;
  height: 10%;
  border-radius: 10px;
`

export const UnregisterUserDesc = styled.Text`
  color:${COLORS.COLOR_BLACK50};
  font-size:15px;
  font-family:'Nunito_Light';
  text-align: center;
`

export const UnregisterUser = styled.Text`
  color:${COLORS.COLOR_YELLOW};
  font-size:18px;
  font-family:'Nunito_SemiBold';
  text-align: center;
`

export const WrapperLottie = styled.View`
  height: 55%;
  width: 100%;
  bottom: 50;
  margin-bottom: 10%;
`

export const SignInButton = styled(Button).attrs(props => ({
  text: 'Entrar'
}))`
  width: 50%;
  height: 55px;
`

import { Dimensions, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import COLORS from '../../../../assets/constants/colors';
import { BEHAVIOR_KEYBOARD } from '../../../utils/behaviorUtils';
import Input from '../../components/inputLine';

const WIDTH_DIMENSION = Dimensions.get('window').width


export const Wrapper = styled.SafeAreaView`
  background-color: ${COLORS.COLOR_SECUNDARY_BLACK};
  flex: 1;
`

export const ContainerTop = styled.View`
  flex: 1 ;
  justify-content: flex-end;
  align-items: center;
`

export const ContainerMiddle = styled(View)`
  flex: 4 ;
`

export const ContainerScrool = styled.View`
  width:${WIDTH_DIMENSION};
  justify-content: center;
  align-items: center;
`

export const ContainerBottom = styled.View`
  flex: 1 ;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`

export const Title = styled.Text`
  color:${COLORS.COLOR_WHITE};
  font-size:20px;
  font-family:'Nunito_Bold';`

export const Description = styled.Text`
  color:${COLORS.COLOR_WHITE_80};
  font-size:16px;
  font-family:'Nunito_Regular';
  text-align: center;
`

export const Confirm = styled(TouchableOpacity).attrs(() => ({
  activeOpacity: 0.8
}))`
  width: 20%;
  height: 60px;
  background-color: ${COLORS.COLOR_YELLOW};
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`

export const Name = styled(Input).attrs(props => ({
  placeHolder: "Como quer ser chamado?",
  keyboardType: "default",
  contentType: "name"
})) <{ error: any }>`
  margin-bottom: 10%;
  border-color: ${props => props.error ? COLORS.COLOR_RED : COLORS.COLOR_WHITE_40}
`


export const Phone = styled(Input).attrs(props => ({
  placeHolder: 'Telefone',
  keyboardType: 'number-pad',
  contentType: 'telephoneNumber',
  returnkeyType: 'done',
  maxLength: 17
})) <{ error: any }>`
  border-color: ${props => props.error ? COLORS.COLOR_RED : COLORS.COLOR_WHITE_40}
`

export const Password = styled(Input).attrs(props => ({
  placeHolder: 'Senha',
  keyboardType: 'ascii-capable',
  contentType: 'password',
  isPassword: true
})) <{ error: any }>`
  border-color: ${props => props.error ? COLORS.COLOR_RED : COLORS.COLOR_WHITE_40}
`

export const containerBackButton = {
  width: '20%',
  height: 60,
  paddingTop: 22,
  textAlign: 'center'
}


export const WrapperKeyboard = styled.KeyboardAvoidingView.attrs(props => ({
  behavior: BEHAVIOR_KEYBOARD,
}))`
  flex:5
`

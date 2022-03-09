import { TouchableOpacity } from 'react-native';
import { CodeField } from 'react-native-confirmation-code-field';
import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';
import Button from '../../components/Button'

export const Input = styled.Text`
    width: 60px;
    height: 60px;
    line-height: 60px;
    font-size: 15px;
    font-family:'Nunito_Bold';
    color: ${colors.COLOR_YELLOW};
    text-align: center;
    margin:0 5px;
    border-radius: 15px;
    background-color: ${colors.COLOR_SECUNDARY_WHITE_60};
`
export const Wrapper = styled.View`
  align-items: center;
  justify-content: space-evenly;
  flex:1;
`

export const Header = styled.View`
  flex-direction:row;
  justify-content:center;
  height:10%;
  width: 100%;
`;

export const Container = styled.View`
  align-items:center;
  flex: 1;
  width: 100%;
`

export const Title = styled.Text`
  margin-top: 5%;
  color:${colors.COLOR_YELLOW};
  font-family:'Nunito_Bold';
  font-size:18px;
`
export const TitleDescription = styled.Text`
  color:${colors.COLOR_BLACK80};
  font-family:'Nunito_Regular';
  font-size:12px;
`

export const TouchableReset = styled(TouchableOpacity).attrs(props => ({
  activeOpacity: 0.8
}))`
  top: 20px;
`

export const CodeBoxes = styled(CodeField).attrs(props => ({
  cellCount: 5,
  returnKeyType: 'done',
  keyboardType: 'default',
  textContentType: 'oneTimeCode'
}))``

export const ButtonConfirm = styled(Button).attrs(props => ({
  text: 'Pronto',
  styleContainer: { width: '60%' }
}))``


export const WrapperKeyboard = styled.KeyboardAvoidingView.attrs(props => ({
  behavior: Platform.OS == 'ios' ? 'padding' : 'height',
}))`
  flex:5
`

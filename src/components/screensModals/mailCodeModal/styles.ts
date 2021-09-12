import { TouchableOpacity } from 'react-native';
import { CodeField } from 'react-native-confirmation-code-field';
import styled from 'styled-components/native';
import COLORS from '../../../../assets/constants/colors';
import Button from '../../components/button'

export const Input = styled.Text`
    width: 60px;
    height: 60px;
    line-height: 60px;
    font-size: 15px;
    font-family:'Nunito_Bold';
    color: ${COLORS.COLOR_YELLOW};
    text-align: center;
    margin:0 5px;
    border-radius: 15px;
    background-color: ${COLORS.COLOR_SECUNDARY_WHITE_60};
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
  color:${COLORS.COLOR_YELLOW};
  font-family:'Nunito_Bold';
  font-size:18px;
`
export const TitleDescription = styled.Text`
  color:${COLORS.COLOR_BLACK80};
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
  returnKeyType: 'none',
  keyboardType: 'default',
  textContentType: 'oneTimeCode'
}))``

export const ButtonConfirm = styled(Button).attrs(props => ({
  text: 'Pronto',
  styleContainer: { width: '60%' }
}))``

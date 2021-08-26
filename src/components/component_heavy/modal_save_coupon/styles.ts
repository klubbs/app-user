import { CodeField } from 'react-native-confirmation-code-field';
import styled from 'styled-components/native';
import colors from '../../../../assets/constants/colors';
import InputLine from '../../component/input_line';

export const InputCoupon = styled(CodeField).attrs(props => ({
  cellCount: 10,
  returnKeyType: 'none',
  keyboardType: 'default',
  textContentType: 'oneTimeCode',
  rootStyle: { marginTop: 50, width: '100%' }
}))``


export const Input = styled.TextInput.attrs(props => ({
  placeholder: 'Digite o código do cupom',
  placeholderTextColor: colors.COLOR_BLACK20,
  keyboardType: 'default',
  returnKeyType: 'done',
  textAlign: 'center',
  maxLength: 10,
  selectionColor: colors.COLOR_YELLOW
}))`
    width: 80%;
    height: 50px;
    font-size: 15px;
    font-family:'Nunito_Bold';
    color: ${colors.COLOR_SECUNDARY_BLACK};
    border-radius: 10px;
    background-color: ${colors.COLOR_BLACK10};
    margin-horizontal:10px;
`

export const Container = styled.View`
  flex-direction: row;
  justify-content:space-between;
`
export const Wrapper = styled.View`
  padding:10px;
  align-items:center;
  justify-content: space-between;
  /* justify-content: space-between; */
`

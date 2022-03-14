import styled from 'styled-components/native'
import { colors } from '../../../../assets/constants/colors'


export const Wrapper = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.9
}))`
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${colors.COLOR_SECUNDARY_BLACK};
  padding-top:  5px;
  padding-bottom:5px;
  padding-right: 15%;
  padding-left: 15%;
`
export const CallUberText = styled.Text`
  color:${colors.COLOR_WHITE};
  font-size:15px;
  font-family:'Nunito_Bold';
`

export const CallUberQuestion = styled.Text`
  color:${colors.COLOR_SECUNDARY_WHITE};
  font-size:12px;
  font-family:'Nunito_Regular';
`

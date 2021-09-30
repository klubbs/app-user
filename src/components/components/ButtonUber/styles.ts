import styled from 'styled-components/native'
import COLORS from '../../../../assets/constants/colors'


export const Wrapper = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.9
}))`
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${COLORS.COLOR_SECUNDARY_BLACK};
  padding-top:  5px;
  padding-bottom:5px;
  padding-right: 15%;
  padding-left: 15%;
`
export const CallUberText = styled.Text`
  color:${COLORS.COLOR_WHITE};
  font-size:15px;
  font-family:'Nunito_Bold';
`

export const CallUberQuestion = styled.Text`
  color:${COLORS.COLOR_SECUNDARY_WHITE};
  font-size:12px;
  font-family:'Nunito_Regular';
`

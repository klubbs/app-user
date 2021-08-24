import styled from 'styled-components/native'
import COLORS from '../../../../assets/constants/colors'


export const Wrapper = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.8
}))`
  /* border-color: ${COLORS.COLOR_BLACK40};
  border-width: 2px; */
  width: 90%;
  height: 60px;
  background-color: ${COLORS.COLOR_YELLOW};
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  color:${COLORS.COLOR_WHITE};
  font-size:18px;
  font-family:'Nunito_Bold';`

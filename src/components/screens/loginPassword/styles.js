import styled from 'styled-components'
import COLORS from '../../../../assets/constants/colors'

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

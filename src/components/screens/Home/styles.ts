import styled from 'styled-components/native'
import COLORS from '../../../../assets/constants/colors'



export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.COLOR_WHITE};
`


export const Container = styled.View`
  flex:0.2;
`

export const ContainerBottom = styled.View`
  flex: 0.8;
  padding-left:2%;
  padding-right:2%;
  justify-content: center;
`

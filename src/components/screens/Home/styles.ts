import styled from 'styled-components/native'
import { colors } from '../../../../assets/constants/colors'



export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.COLOR_WHITE};
  justify-content: center;
`


export const Container = styled.View`
  flex:0.2;
`

export const ContainerBottom = styled.View`
  flex: 0.8;
  padding-left:2%;
  background-color: red;
  padding-right:2%;
  justify-content: center;
`

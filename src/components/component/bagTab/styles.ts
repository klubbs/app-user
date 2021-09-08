import { MotiView } from '@motify/components'
import styled from 'styled-components/native'
import colors from '../../../../assets/constants/colors'


export const Container = styled.View`
  background-color:${colors.COLOR_YELLOW};
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  width:100%;
  `

export const Wrapper = styled(MotiView).attrs(props => ({

}))`
  overflow: hidden;
  position:absolute;
  bottom:0;
  left:0;
  right:0;
`

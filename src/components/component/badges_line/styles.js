import styled from 'styled-components'
import COLORS from '../../../../assets/constants/colors'


export const StatusText = styled.Text`
  color:${COLORS.COLOR_BLACK80};
  font-size:12px;
  font-family:'Nunito_Bold';
`

export const StatusBox = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color:${props => props.color}40;
  border-color: ${props => props.color}80;
  border-width: 1px;
  padding-top:  2.5px;
  padding-bottom: 2.5px;
  padding-right: 10px;
  padding-left: 10px;
`

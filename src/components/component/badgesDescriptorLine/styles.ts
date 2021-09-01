import styled from 'styled-components/native';
import COLORS from '../../../../assets/constants/colors';


export const Description = styled.Text`
  color:${COLORS.COLOR_BLACK80};
  font-size:12px;
  font-family:'Nunito_Light';
`

export const DescriptionPrincipal = styled.Text<{ color: any }>`
  color:${props => props.color};
  font-size:12px;
  font-family:'Nunito_Bold';
`

export const ContainerBadge = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  border-radius: 8px;
  border-color: ${`${COLORS.COLOR_YELLOW}50`};
  border-width: 1px;
  padding-top:  8px;
  padding-bottom: 8px;
  padding-right: 20px;
  padding-left: 20px;
`


export const ContainerDescription = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

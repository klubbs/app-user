import styled from 'styled-components/native';
import colors from '../../../../assets/constants/colors';

export const Wrapper = styled.View`
  flex:1;
  justify-content:flex-start;
  padding:20px;
`


export const Name = styled.Text`
  color:${colors.COLOR_BLACK80};
  font-size:25px;
  font-family:'Nunito_Light';
`

export const Description = styled.Text`
  color:${colors.COLOR_BLACK80};
  font-size:30px;
  font-family:'Nunito_Regular';
`

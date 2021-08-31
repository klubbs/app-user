import styled from 'styled-components/native';
import colors from '../../../../assets/constants/colors';

export const Wrapper = styled.View`
  flex:1;
  justify-content:flex-start;
  padding:20px;
`


export const Name = styled.Text`
  color:${colors.COLOR_SECUNDARY_BLACK};
  font-size:18px;
  font-family:'Nunito_Light';
`

export const Description = styled.Text`
  color:${colors.COLOR_SECUNDARY_BLACK};
  font-size:16px;
  font-family:'Nunito_Light';
`

export const Divider = styled.View`
  height: 1px;
  margin-top:10px;
  margin-bottom: 20px;
  background-color: ${colors.COLOR_BLACK10};
`

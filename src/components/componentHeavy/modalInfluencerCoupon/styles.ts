import styled from 'styled-components/native';
import colors from '../../../../assets/constants/colors';
import { Feather } from '@expo/vector-icons';
import { motify } from '@motify/core';

export const Wrapper = styled.View`
  flex:1;
  justify-content:flex-start;
  align-items: center;
  padding:20px;
`


export const Divider = styled.View`
  height: 1px;
  margin-top:10px;
  margin-bottom: 20px;
  background-color: ${colors.COLOR_BLACK10};
`

export const Container = styled.View`
  background-color: ${colors.COLOR_BLACK10};
  flex-direction:row;
  border-radius: 10px;
  width: 90%;
  height:60px;
  justify-content: space-evenly;
  align-items: center;
`

export const Code = styled.Text`
  color:${colors.COLOR_SECUNDARY_BLACK};
  font-family:'Nunito_Bold';
  font-size:14px;
`


export const Copy = styled(Feather).attrs(props => ({
  name: 'copy',
  size: 20,
  color: colors.COLOR_BLACK40
}))`
`


import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import colors from '../../../../assets/constants/colors';



export const Wrapper = styled.View`
  background-color: ${colors.COLOR_WHITE};
  padding-top:25%;
  padding-bottom:25%;
  flex:1;
`

export const Header = styled.Text`
  color:${colors.COLOR_SECUNDARY_BLACK};
  margin-bottom: 20px;
  margin-left:6%;
  font-size:14px;
  font-family:'Nunito_Bold';
`

export const HeaderContainer = styled.View`
  flex-direction:row;
  padding-horizontal:6%;
  justify-content: space-between;
  align-items:center;
`

export const FlatComponent = styled.FlatList.attrs(props => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false
}))``

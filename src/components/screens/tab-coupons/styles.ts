import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';


export const SafeArea = styled.SafeAreaView`
  flex:1;
  background-color: ${colors.COLOR_SECUNDARY_WHITE};
`

export const tabStyle = {
  activeTintColor: colors.COLOR_YELLOW,
  inactiveTintColor: colors.COLOR_BLACK50,
  indicatorStyle: { borderWidth: 1.5, borderColor: colors.COLOR_YELLOW, width: '25%', marginLeft: '9%', backgroundColor: colors.COLOR_YELLOW },
  style: { backgroundColor: colors.COLOR_SECUNDARY_WHITE },
  labelStyle: { fontFamily: 'Nunito_SemiBold' }
}


export const HeaderContainer = styled.View`
  flex-direction: row;
  flex:0.10;
  justify-content: flex-end;
  align-items: center;
  padding-horizontal:10px;
`



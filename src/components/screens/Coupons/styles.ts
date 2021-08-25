import styled from 'styled-components/native';
import COLORS from '../../../../assets/constants/colors';


export const SafeArea = styled.SafeAreaView`
  flex:1;
  background-color: ${COLORS.COLOR_SECUNDARY_WHITE};
`

export const Title = styled.Text`
  color:${COLORS.COLOR_SECUNDARY_BLACK};
  font-size:25px;
  font-family:'Nunito_SemiBold';
`

export const tabStyle = {
  activeTintColor: COLORS.COLOR_YELLOW,
  inactiveTintColor: COLORS.COLOR_BLACK50,
  indicatorStyle: { borderWidth: 1.5, borderColor: COLORS.COLOR_YELLOW, width: '25%', marginLeft: '9%', borderRadius: 10 },
  style: { backgroundColor: COLORS.COLOR_SECUNDARY_WHITE },
  labelStyle: { fontFamily: 'Nunito_SemiBold' }
}


export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal:10px;
`


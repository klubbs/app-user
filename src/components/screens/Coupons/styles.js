import styled from 'styled-components'
import COLORS from '../../../../assets/constants/colors'

export const SafeArea = styled.SafeAreaView`
  flex:1;
  background-color: ${COLORS.COLOR_SECUNDARY_WHITE};
`

export const Title = styled.Text`
  color:${COLORS.COLOR_BLACK};
  font-size:25px;
  font-family:'Nunito_SemiBold';
  margin-left: 5%;
  margin-bottom: 5px;
`

export const Description = styled.Text`
  color:${COLORS.COLOR_BLACK80};
  font-size:12px;
  font-family:'Nunito_Regular';
  margin-left: 5%;
  margin-bottom: 15px;
`

export const UnregisterUser = styled.Text`
  color:${COLORS.COLOR_YELLOW};
  font-size:18px;
  font-family:'Nunito_SemiBold';
  text-align: center;
`

export const UnregisterUserDesc = styled.Text`
  color:${COLORS.COLOR_BLACK50};
  font-size:15px;
  font-family:'Nunito_Light';
  text-align: center;
`

export const UnregisterBoxText = styled.View`
  background-color: ${COLORS.COLOR_BLACK5};
  align-items: center;
  justify-content: center;
  margin-top: 20%;
  width: 90%;
  height: 10%;
  border-radius: 10;
`

export const WrapperLottie = styled.View`
  height: 55%;
  width: 100%;
  bottom: 50;
  margin-bottom: 10%;
`

export const UnregisterSafeArea = styled.SafeAreaView`
  flex:1;
  background-color: ${COLORS.COLOR_WHITE};
  align-items: center;
`

export const tabStyle = {
  activeTintColor: COLORS.COLOR_YELLOW,
  inactiveTintColor: COLORS.COLOR_BLACK50,
  indicatorStyle: { borderWidth: 1.5, borderColor: COLORS.COLOR_YELLOW, width: '25%', marginLeft: '9%', borderRadius: 10 },
  style: { backgroundColor: COLORS.COLOR_SECUNDARY_WHITE },
  labelStyle: { fontFamily: 'Nunito_SemiBold' }
}

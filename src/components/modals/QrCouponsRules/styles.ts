import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';

export const Wrapper = styled.View`
  flex:1;
  padding:20px;
`


export const Name = styled.Text`
  color:${colors.COLOR_SECUNDARY_BLACK};
  font-size:18px;
  font-family:'Nunito_Light';
`

export const ExpireIn = styled.Text`
  color:${colors.COLOR_BLACK50};
  font-size:12px;
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

export const MinimumTicketSubtitle = styled.Text`
  color:${colors.COLOR_BLACK40};
  font-size:13px;
  font-family:'Nunito_Regular';
`

export const MinimumTicket = styled.Text`
  color:${colors.COLOR_GREEN};
  font-size:13px;
  font-family:'Nunito_ExtraBold';
`

export const WrapperTicket = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2.5%;
  margin-bottom: 2.5%;
  text-align: center;
  align-items: center;
`

export const Off = styled.Text`
  color:${colors.COLOR_WHITE};
  font-size:15px;
  font-family:'Nunito_ExtraBold';
`
export const WrapperOff = styled.View`
  width: 50px;
  height: 25px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${colors.COLOR_SECUNDARY_BLACK};
`

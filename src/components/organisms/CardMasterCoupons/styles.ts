import styled from 'styled-components/native';
import colors from '../../../../assets/constants/colors';
import { MotiView } from 'moti'


export const WrapperCard = styled(MotiView).attrs(props => ({
  from: {
    opacity: 0
  },
  animate: {
    opacity: 1
  }
}))`
  width: 90%;
  align-self:center;
  height: 220px;
  border-color:${colors.COLOR_BLACK10};
  border-width: 2px;
  border-radius:8px;
  margin-bottom:20px;
`

export const TopContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding:10px;
  flex:1;
`

export const BottomContainer = styled.View`
  justify-content: space-around;
  align-items: flex-start;
  padding:10px;
  flex:2;
`
export const SubBottomContainer = styled.View`
  background-color: ${colors.COLOR_BLACK10};
  justify-content: center;
  text-align:center;
  align-items: center;
  height: 15px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`

export const Name = styled.Text`
  color:${colors.COLOR_SECUNDARY_BLACK};
  font-size:16px;
  font-family:'Nunito_Regular';
`

export const Rules = styled.Text`
  color:${colors.COLOR_BLACK40};
  font-size:13px;
  font-family:'Nunito_Regular';
`

export const SeeMore = styled.Text`
  color:${colors.COLOR_YELLOW};
  font-size:11px;
  font-family:'Nunito_SemiBold';
`
export const Off = styled.Text`
  color:${colors.COLOR_WHITE};
  font-size:15px;
  font-family:'Nunito_ExtraBold';
`

export const ValidAt = styled.Text`
  color:${colors.COLOR_BLACK40};
  font-size:11px;
  font-family:'Nunito_Bold';
`

export const WrapperOff = styled.View`
  width: 50px;
  height: 25px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${colors.COLOR_YELLOW};
`

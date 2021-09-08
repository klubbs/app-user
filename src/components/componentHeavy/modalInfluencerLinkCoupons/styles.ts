import styled from 'styled-components/native';
import colors from '../../../../assets/constants/colors';



export const Wrapper = styled.View`
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  width: 100%;
  flex:1;
  /* background-color: ${colors.COLOR_RED};
  height:80%;
  flex:1;
  height: 100%;
  width:100%; */
`

export const Header = styled.Text`
  color:${colors.COLOR_BLACK80};
  font-size:12px;
  font-family:'Nunito_Bold';
`

export const BottomTab = styled.View`
  background-color: ${colors.COLOR_YELLOW};
  height: 100px;
  width: 110%;
  border-width: 3px;
  border-top-color: ${colors.COLOR_YELLOW_RATING};
  position: absolute;
  bottom: 0;
`

export const Empty = styled.View`
  background-color: transparent;
  justify-content: center;
  align-items: center;
  width: 48%;
  height: 200px;
  border-radius: 10px;
`

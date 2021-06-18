import styled from 'styled-components'
import COLORS from '../../../../assets/constants/colors';


export const WelcomeName = styled.Text`
  color:${COLORS.COLOR_BLACK};
  font-size:15px;
  font-family:'Nunito_Bold';
`;

export const Wrapper = styled.View`
  flex-direction: row-reverse;
  /* justify-content: space-between; */
  align-items: center;
  padding-horizontal: 20px;
  padding-vertical: 10px;
`;

export const Circle = styled.View`
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: ${COLORS.COLOR_YELLOW};
`;

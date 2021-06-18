import styled from "styled-components";
import COLORS from "../../../../assets/constants/colors";


export const Wrapper = styled.View`
  width: 100%;
  height: 140px;
  flex-direction: row;
`;

export const Dot = styled.View`
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  background-color: ${COLORS.COLOR_BLACK40};
`;


export const Line = styled.View`
  width: 1px;
  height: 50%;
  background-color: ${COLORS.COLOR_BLACK40};
`;


export const RightContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  align-content: flex-start;
`;


export const ContainerLeft = styled.View`
  flex: 0.2;
  justify-content: flex-end;
  align-items: center;
`;

export const Box = styled.View`
  width: 30%;
  height: 80%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.COLOR_WHITE};
`

export const ContainerText = styled.View`
  margin-left: 5%;
`

export const Name = styled.Text`
  color:${COLORS.COLOR_SECUNDARY_BLACK};
  font-size:16px;
  font-family:'Nunito_Bold';
`

export const Points = styled.Text`
  color:${COLORS.COLOR_BLACK80};
  font-size:12px;
  font-family:'Nunito_Light';
`

export const Percent = styled.Text`
  color:${COLORS.COLOR_SECUNDARY_BLACK};
  font-size:12px;
  font-family:'Nunito_Light';
  transform: rotate(-90deg);
  margin-bottom: 35%
`

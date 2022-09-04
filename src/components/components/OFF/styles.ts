import styled from "styled-components/native";
import { colors } from "../../../../assets/constants/colors";

export const Container = styled.View`
  padding-left:8px;
  padding-right:8px;
  height: 24px;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background-color: ${colors.COLOR_SECUNDARY_BLACK};
`

export const Off = styled.Text`
  color:${colors.COLOR_WHITE};
  font-size:14px;
  font-family:'Nunito_ExtraBold';
`

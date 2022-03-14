import styled from "styled-components/native";
import { colors } from "../../../../assets/constants/colors";

export const Container = styled.View`
width: 50px;
height: 25px;
justify-content: center;
align-items: center;
border-radius: 5px;
background-color: ${colors.COLOR_SECUNDARY_BLACK};
`

export const Off = styled.Text`
  color:${colors.COLOR_WHITE};
  font-size:15px;
  font-family:'Nunito_ExtraBold';
`

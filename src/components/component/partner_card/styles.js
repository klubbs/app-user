import styled from "styled-components"
import COLORS from "../../../../assets/constants/colors";

export const ContainerDescription = styled.View`
  flex: 1;
`;


export const Wrapper = styled.View`
  width: 140px;
  height: 150px;
  background-color: ${COLORS.COLOR_WHITE};
  border-radius: 20px;
  padding: 10px;
  margin-right: 10px;
  /* border-width: 0.5px;
  border-color: ${COLORS.COLOR_YELLOW}; */
  shadow-color:${COLORS.COLOR_BLACK};
  shadow-opacity: 0.05px;
  shadow-offset: 0 2px;
  shadow-radius: 1px;
`;

export const WrapperImage = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;


export const PartnerName = styled.Text`
  color:${COLORS.COLOR_BLACK};
  font-size:14px;
  font-family:'Nunito_Regular';
`;

export const Coupons = styled.Text`
  color:${COLORS.COLOR_TEXT_SECUNDARY};
  font-size:10px;
  font-family:'Nunito_Regular';
`;

export const ContainerSocialMidias = styled.View`
  flex:1;
  margin-top: 20px;
  flex-direction: row;
  width: 30%;
  justify-content: space-between;
`;

export const ContainerTexts = styled.View`
  flex:1;
`;


export const Image = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

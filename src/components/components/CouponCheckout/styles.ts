import { PlaceholderMedia } from "rn-placeholder";
import styled from "styled-components/native";
import { colors } from "../../../../assets/constants/colors";
import { Skeleton } from '@motify/skeleton';
import { MotiView } from 'moti'


export const Wrapper = styled.View`
  width: 100%;
  height: 140px;
  flex-direction: row;
`;

export const Dot = styled.View`
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  background-color: ${colors.COLOR_BLACK40};
`;


export const Line = styled.View`
  width: 1px;
  height: 50%;
  background-color: ${colors.COLOR_BLACK40};
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

export const Box = styled(MotiView)`
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.COLOR_WHITE};
`

export const ContainerText = styled.View`
  margin-left: 5%;
`

export const Name = styled.Text`
  color:${colors.COLOR_SECUNDARY_BLACK};
  font-size:16px;
  font-family:'Nunito_Bold';
`

export const Time = styled.Text`
  color:${colors.COLOR_BLACK80};
  font-size:12px;
  font-family:'Nunito_Light';
`

export const Percent = styled.Text`
  color:${colors.COLOR_SECUNDARY_BLACK};
  font-size:12px;
  font-family:'Nunito_Bold';
  transform: rotate(-90deg);
  margin-bottom: 35%;
`

export const CouponImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`

export const ImageEmpty = styled(Skeleton).attrs(props => ({
  width: 80,
  height: 80,
  radius: 'round',
  colors: [colors.COLOR_SECUNDARY_WHITE, colors.COLOR_WHITE_20]
}))``

export const EstablishmentImage = styled.Image`
  width:80px;
  height:80px;
  border-radius:40px;
`


import { MotiView } from '@motify/components';
import { Skeleton } from '@motify/skeleton';
import styled from "styled-components/native";
import { default as colors, default as COLORS } from '../../../../assets/constants/colors';


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
  margin-bottom: 35%;
`

export const CouponImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`
export const NothingTransactionSubtitle = styled.Text`
  color:${colors.COLOR_BLACK50};
  font-size:14px;
  margin-top:20px;
  align-self: center;
  font-family:'Nunito_Light';
`
export const CheckoutsFlatList = styled.FlatList.attrs(props => ({
  showsVerticalScrollIndicator: false
}))`
  background-color: ${colors.COLOR_WHITE};
`

export const SquareSkeleton = styled(Skeleton).attrs(props => ({
  width: 40,
  height: 40,
  colors: [COLORS.COLOR_WHITE_40, COLORS.COLOR_BLACK20]
}))``

export const LineSkeleton = styled(Skeleton).attrs((props) => ({
  width: props.top ? '90%' : '40%',
  height: 15,
  radius: 4,
  colors: [COLORS.COLOR_WHITE_40, COLORS.COLOR_BLACK20]
})) <{ top?: boolean }>``

export const SpaceSkeleton = styled.View`
  height:5px;
  width:5px;
`


export const WrapperSkeleton = styled(MotiView)`
  top:5%;
  padding-left: 5%;
  /* left:2%; */
  height: 40px;
  width:100%;
  flex-direction: row;
  align-items: center;
`

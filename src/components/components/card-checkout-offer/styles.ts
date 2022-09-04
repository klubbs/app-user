import { PlaceholderMedia } from "rn-placeholder";
import styled from "styled-components/native";
import { colors } from "../../../../assets/constants/colors";
import { Skeleton } from '@motify/skeleton';
import { MotiView } from 'moti'
import { Dimensions } from "react-native";
import { CouponIcon } from "../../../../assets/icons/coupon_icon";


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
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  right:10%;
`;


export const ContainerLeft = styled.View`
  flex: 0.15;
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

export const WrapperOffer = styled.TouchableOpacity.attrs(({
  activeOpacity: 0.9
}))`
/* ${Dimensions.get('window').width} */
  background-color:white ;
  width: 95%;
  height: 70px;
  flex-direction: row;
  align-items:center;
  border-radius:5px;
  padding:2px;
`

export const StoreImage = styled.Image.attrs(({
  source: { uri: 'https://lh5.googleusercontent.com/p/AF1QipM1diGCOLMQgMYDZFQGn8F2mHWzeU4u5p9UAaJS=w480-h520-p-k-no' }
}))`
  flex:0.2;
  height:100%;
  border-top-left-radius:5px ;
  border-bottom-left-radius:5px ;
`

export const WrapperOfferContainer = styled.View<{ color: 'GREEN' | 'YELLOW' }>`
  flex:0.8;
  height:100%;
  background-color: ${colors.COLOR_BLACK5};
  border-top-right-radius:2px ;
  border-bottom-right-radius:2px ;
  padding-left:2%;
  padding-right:2%;
  align-items:flex-start;
  justify-content:center;
  border-right-width:5px ;
  border-right-color:  ${props => props.color == 'GREEN' ? colors.COLOR_GREEN : colors.COLOR_YELLOW};
`

export const StoreName = styled.Text.attrs(({ numberOfLines: 3 }))`
  color:${colors.COLOR_SECUNDARY_BLACK};
  font-size:14px;
  font-family:'Nunito_Bold';
  max-width: 90;
`

export const BoldText = styled.Text<{ typeGreen?: boolean }>`
  color: ${colors.COLOR_BLACK40};
  font-size:12px;
  font-family:'Nunito_ExtraBold';
`

export const ContaineOfferTop = styled.View`
  flex:0.5
  justify-content:flex-end;
`

export const ContaineOfferBottom = styled.View`
  flex:1
  width:100%;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
`

export const TextBoxContainer = styled.View<{ type: 'GREEN' | 'YELLOW' }>`
  height: 24px;
  padding-left:5px;
  padding-right:5px;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  flex-direction:row ;
  background-color: ${props => props.type == 'GREEN' ? colors.COLOR_GREEN : colors.COLOR_YELLOW};
`
export const TextBox = styled.Text<{ type: 'GREEN' | 'YELLOW' }>`
  color:${props => props.type == 'GREEN' ? colors.COLOR_SECOND_GREEN : colors.COLOR_YELLOW_BUTTON_TEXT};
  font-size:13px;
  font-family:'Nunito_ExtraBold';
`


export const CouponStyled = styled(CouponIcon).attrs<{ type: 'GREEN' | 'YELLOW' }>(props => ({
  fill: props.type == 'GREEN' ? colors.COLOR_SECOND_GREEN : colors.COLOR_YELLOW_BUTTON_TEXT,
  width: 20,
  height: 12
}))``

import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';
import { Skeleton } from '@motify/skeleton';
import { Dimensions } from 'react-native';
import { CouponIcon } from '../../../../assets/icons/coupon_icon';

export const Wrapper = styled.View`
  width: 100%;
  height: 140px;
  flex-direction: row;
`;

export const Dot = styled.View<{ type: 'GREEN' | 'YELLOW' }>`
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  background-color: ${(props) =>
    props.type == 'GREEN' ? colors.COLOR_GREEN : colors.COLOR_YELLOW}; ;
`;

export const Line = styled.View<{ type: 'GREEN' | 'YELLOW' }>`
  width: 1px;
  height: 80%;
  background-color: ${(props) =>
    props.type == 'GREEN' ? colors.COLOR_GREEN : colors.COLOR_YELLOW}; ;
`;

export const RightContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  right: 10%;
`;

export const ContainerLeft = styled.View`
  flex: 0.15;
  justify-content: flex-end;
  align-items: center;
`;

export const CouponImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

export const ImageEmpty = styled(Skeleton).attrs({
  width: 75,
  height: '100%',
  // radius: '2',
  colors: [colors.COLOR_WHITE_GRAY, colors.COLOR_WHITE, colors.COLOR_SECUNDARY_WHITE],
})``;

export const WrapperOffer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  /* ${Dimensions.get('window').width} */
  background-color: white;
  width: 100%;
  height: 85px;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  padding: 2px;
`;

export const StoreImage = styled.Image.attrs<{ sourceImage: string }>((props) => ({
  source: { uri: `https://klubbs-establishment.s3.amazonaws.com/${props.sourceImage}` },
}))<{ sourceImage: string }>`
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

export const WrapperOfferContainer = styled.View<{ type: 'GREEN' | 'YELLOW' }>`
  flex: 1;
  height: 100%;
  background-color: ${colors.COLOR_BLACK5};
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  padding-left: 2%;
  padding-right: 2%;
  align-items: flex-start;
  justify-content: center;
  border-right-width: 5px;
  border-right-color: ${(props) =>
    props.type == 'GREEN' ? colors.COLOR_GREEN : colors.COLOR_YELLOW};
`;

export const StoreName = styled.Text.attrs({ numberOfLines: 1 })`
  color: ${colors.COLOR_SECUNDARY_BLACK};
  font-size: 14px;
  font-family: 'Nunito_Bold';
  max-width: 100%;
`;

export const BoldText = styled.Text<{ typeGreen?: boolean }>`
  color: ${colors.COLOR_BLACK40};
  font-size: 12px;
  font-family: 'Nunito_ExtraBold';
  /* align-self: flex-end; */
`;

export const ContaineOfferTop = styled.View`
  flex: 1;
  width: 100%;
  justify-content: flex-end;
`;

export const ContaineOfferBottom = styled.View`
  flex:1
  width:100%;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
`;

export const TextBoxContainer = styled.View<{ type: 'GREEN' | 'YELLOW' }>`
  height: 24px;
  padding-left: 5px;
  padding-right: 5px;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  flex-direction: row;
  background-color: ${(props) =>
    props.type == 'GREEN' ? colors.COLOR_GREEN : colors.COLOR_YELLOW};
`;
export const TextBox = styled.Text<{ type: 'GREEN' | 'YELLOW' }>`
  color: ${(props) =>
    props.type == 'GREEN' ? colors.COLOR_SECOND_GREEN : colors.COLOR_YELLOW_BUTTON_TEXT};
  font-size: 13px;
  font-family: 'Nunito_ExtraBold';
`;

export const CouponStyled = styled(CouponIcon).attrs<{ type: 'GREEN' | 'YELLOW' }>((props) => ({
  fill: props.type == 'GREEN' ? colors.COLOR_SECOND_GREEN : colors.COLOR_YELLOW_BUTTON_TEXT,
  width: 20,
  height: 12,
}))<{ type: 'GREEN' | 'YELLOW' }>``;

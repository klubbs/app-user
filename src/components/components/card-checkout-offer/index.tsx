import React, { memo } from 'react';
import { IUserCheckoutsReponse } from '../../../services/@types/@coupon-services';
import { formatCurrency } from '../../../utils/formatersUtils';
import OFF from '../OFF';
import { Selector } from '../selector';
import {
  ContainerLeft,
  Dot,
  Line,
  RightContainer,
  Wrapper,
  ImageEmpty,
  WrapperOffer,
  StoreImage,
  WrapperOfferContainer,
  StoreName,
  BoldText,
  ContaineOfferTop,
  ContaineOfferBottom,
  TextBox,
  TextBoxContainer,
  CouponStyled,
} from './styles';

type CardCheckoutOfferProps = {
  data: IUserCheckoutsReponse;
  withSelector: boolean;
  onPress: () => void;
};

const MemoiZedCardCheckout = memo((props: CardCheckoutOfferProps) => {
  const IS_CHECKIN = !props.data.checkouted_at;
  const COLOR_TYPE = IS_CHECKIN ? 'YELLOW' : 'GREEN';

  function howDateShow() {
    const date = props.data.checkouted_at ?? props.data.pre_checkouted_at;

    return date.ToDateFormat().toLocaleTimeString('pt-br', {
      formatMatcher: 'best fit',
      day: 'numeric',
      month: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function howAmount() {
    if (props.data.amount) {
      return formatCurrency(props.data.amount);
    } else {
      return formatCurrency(props.data.user_informed_amount);
    }
  }

  function RenderTextBox(isCoupon: boolean) {
    return (
      <TextBoxContainer type={COLOR_TYPE}>
        {isCoupon && <CouponStyled type={COLOR_TYPE} />}
        <TextBox type={COLOR_TYPE}>
          {isCoupon ? props.data.coupon_code : IS_CHECKIN ? 'CHECKIN' : 'CHECKOUT'}
        </TextBox>
      </TextBoxContainer>
    );
  }

  function RenderImage() {
    return (
      <ImageEmpty>
        {props.data.store_image ? <StoreImage sourceImage={props.data.store_image} /> : undefined}
      </ImageEmpty>
    );
  }

  return (
    <Wrapper>
      <ContainerLeft>
        <Dot type={COLOR_TYPE} />
        <Line type={COLOR_TYPE} />
      </ContainerLeft>
      <RightContainer>
        {RenderTextBox(true)}
        <WrapperOffer onPress={props.onPress}>
          {props.withSelector && <Selector toggle={true} />}
          <RenderImage />
          <WrapperOfferContainer type={COLOR_TYPE}>
            <ContaineOfferTop>
              <StoreName>{props.data.store_name}</StoreName>
              <BoldText style={{ alignSelf: 'flex-end' }}>{howDateShow()}</BoldText>
            </ContaineOfferTop>
            <ContaineOfferBottom>
              <OFF off={props.data.discount} />
              {RenderTextBox(false)}
              <BoldText> {howAmount()}</BoldText>
            </ContaineOfferBottom>
          </WrapperOfferContainer>
        </WrapperOffer>
      </RightContainer>
    </Wrapper>
  );
});

export { MemoiZedCardCheckout };

import React from 'react';
import { Platform, View } from 'react-native';
import { IUserCheckoutsReponse } from '../../../services/@types/@coupon-services';
import OFF from '../OFF';
import { Selector } from '../selector';
import { CouponIcon } from '../../../../assets/icons/coupon_icon';
import {
  Box,
  ContainerLeft,
  ContainerText, Dot,
  Line,
  Name,
  Percent, Time,
  RightContainer,
  Wrapper,
  ImageEmpty,
  EstablishmentImage,
  WrapperOffer,
  StoreImage,
  WrapperOfferContainer,
  StoreName,
  BoldText,
  ContaineOfferTop,
  ContaineOfferBottom,
  TextBox,
  TextBoxContainer,
  CouponStyled
} from './styles';
import { colors } from '../../../../assets/constants/colors';


type CardCheckoutOfferProps = {
  data: IUserCheckoutsReponse;
  withSelector: boolean
}

export const CardCheckoutOffer: React.FC<CardCheckoutOfferProps> = (props) => {

  // !props.data.checkouted_at
  const IS_CHECKIN = true

  function howDateShow() {

    const date = props.data.checkouted_at ?? props.data.pre_checkouted_at

    return date.ToDateFormat()
      .toLocaleTimeString("pt-br",
        {
          formatMatcher: "best fit",
          day: 'numeric',
          month: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }
      )
  }

  function howAmount() {

    if (props.data.amount) {
      return Platform.select({
        ios: props.data
          .amount
          .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
        android: `R$ ${props.data.amount}`
      })
    } else {
      return Platform.select({
        ios: props.data
          .user_informed_amount
          .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
        android: `R$ ${props.data.user_informed_amount}`
      })
    }

  }

  function RenderTextBox(isCoupon: boolean) {

    const colorType = IS_CHECKIN ? 'YELLOW' : 'GREEN'

    return (
      <TextBoxContainer type={colorType}>
        {
          isCoupon &&
          <CouponStyled type={colorType} />
        }
        <TextBox type={colorType}>
          {isCoupon
            ? props.data.coupon_code
            : IS_CHECKIN
              ? 'CHECKIN'
              : 'CHECKOUT'}
        </TextBox>
      </TextBoxContainer>
    )
  }

  return (
    <Wrapper >
      <ContainerLeft >
        <Percent>{props.data.discount} %</Percent>
        <Dot />
        <Line />
      </ContainerLeft>
      <RightContainer >
        {RenderTextBox(true)}
        <WrapperOffer onPress={() => { }}>
          {props.withSelector && <Selector toggle={true} />}
          <StoreImage />
          <WrapperOfferContainer>
            <ContaineOfferTop>
              <StoreName>{props.data.store_name}</StoreName>
            </ContaineOfferTop>
            <ContaineOfferBottom>
              <OFF off={props.data.discount} />
              {RenderTextBox(false)}
              <BoldText> {howAmount()}</BoldText>
              <BoldText>{howDateShow()}</BoldText>
            </ContaineOfferBottom>
          </WrapperOfferContainer>
        </WrapperOffer>
        {/* <EstablishmentImage source={{ uri: `https://klubbs-establishment.s3.amazonaws.com/${props.data.store_image}` }} /> */}

      </RightContainer>
    </Wrapper>
  )
}

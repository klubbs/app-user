import React from 'react';
import { Platform } from 'react-native';
import { IUserCheckoutsReponse } from '../../../services/@types/@coupon-services';
import OFF from '../OFF';
import { Selector } from '../selector';
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
  StoreTicket
} from './styles';


type CardCheckoutOfferProps = {
  data: IUserCheckoutsReponse;
  withSelector: boolean
}

export const CardCheckoutOffer: React.FC<{ data: IUserCheckoutsReponse }> = (props) => {

  function howAmount() {

    if (props.data.amount) {
      Platform.select({
        ios: props.data
          .amount
          .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
        android: `R$ ${props.data.amount}`
      })
    } else {
      Platform.select({
        ios: props.data
          .user_informed_amount
          .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
        android: `R$ ${props.data.user_informed_amount}`
      })
    }

  }

  return (
    <Wrapper >
      <ContainerLeft >
        <Percent>{props.data.discount} %</Percent>
        <Dot />
        <Line />
      </ContainerLeft>
      <RightContainer >
        <WrapperOffer onPress={() => { }}>
          {props.withSelector && <Selector toggle={true} />}
          <StoreImage />
          <WrapperOfferContainer>
            <StoreName>{props.data.store_name}</StoreName>
            <OFF off={props.data.discount} />
            <StoreTicket> {howAmount()}</StoreTicket>
          </WrapperOfferContainer>
        </WrapperOffer>
        {/* <Box>
          <ImageEmpty show={props.data?.store_image?.trim() === '' || props.data?.store_image === null}>
            <EstablishmentImage source={{ uri: `https://klubbs-establishment.s3.amazonaws.com/${props.data.store_image}` }} />
          </ImageEmpty>
        </Box>
        <ContainerText>
          <Name>{props.data.store_name}</Name>
          <Time>{props
            .data
            .checkouted_at?.ToDateFormat()
            .toLocaleTimeString("pt-br",
              {
                formatMatcher: "best fit",
                day: 'numeric',
                month: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
          </Time>
        </ContainerText> */}
      </RightContainer>
    </Wrapper>
  )
}

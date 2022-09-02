import React from 'react';
import { IUserCheckoutsReponse } from '../../../services/@types/@coupon-services';
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
  EstablishmentImage
} from './styles';




export const CouponsCheckoutItems: React.FC<{ data: IUserCheckoutsReponse }> = (props) => {

  return (
    <Wrapper >
      <ContainerLeft >
        <Percent>{props.data.discount} %</Percent>
        <Dot />
        <Line />
      </ContainerLeft>
      <RightContainer >
        <Box>
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
        </ContainerText>
      </RightContainer>
    </Wrapper>
  )
}

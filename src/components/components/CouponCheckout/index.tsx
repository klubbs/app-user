import React from 'react';
import { ICouponCheckoutItem } from './interface';
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




export const CouponsCheckoutItems: React.FC<{ data: ICouponCheckoutItem }> = (props) => {


  return (
    <Wrapper >
      <ContainerLeft >
        <Percent>{props.data.off} %</Percent>
        <Dot />
        <Line />
      </ContainerLeft>
      <RightContainer >
        <Box>
          <ImageEmpty show={props.data?.image?.trim() === ''}>
            <EstablishmentImage source={{ uri: `https://klubbs-establishment.s3.amazonaws.com/${props.data.image}` }} />
          </ImageEmpty>
        </Box>
        <ContainerText>
          <Name>{props.data.establishment_name}</Name>
          <Time>{props
            .data
            .created_at?.ToDateFormat()
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

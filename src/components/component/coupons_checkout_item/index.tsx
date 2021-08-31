import { Skeleton } from '@motify/skeleton';
import React from 'react';
import { ICouponCheckoutItem } from './interface';
import {
  Box,
  ContainerLeft,
  ContainerText, Dot,
  Line,
  Name,
  Percent, PlaceHolderRound, Points,
  RightContainer,
  Wrapper,
  ImageEmpty
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

          <ImageEmpty />
          {/* <Placeholder Animation={Fade}>
          <PlaceHolderRound />
          </Placeholder> */}

        </Box>
        <ContainerText>
          <Name>{props.data.establishment_name}</Name>
          {/* TODO */}
          <Points>{props
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
          </Points>

          {/* <Points>100 pontos</Points> */}
        </ContainerText>
      </RightContainer>
    </Wrapper>
  )
}

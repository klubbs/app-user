import React from 'react';
import { Fade, Placeholder } from 'rn-placeholder';
import { ICouponCheckoutItem } from './interface';
import {
  Box,
  ContainerLeft,
  ContainerText, Dot,
  Line,
  Name,
  Percent, PlaceHolderRound, Points,
  RightContainer,
  Wrapper
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

          <Placeholder Animation={Fade}>
            {/* <PlaceholderMedia /> */}
            <PlaceHolderRound />
          </Placeholder>

          {/* <CouponImage source={{ uri: props.data.image }} /> */}
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

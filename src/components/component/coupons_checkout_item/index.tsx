import React from 'react';
import { ICouponCheckoutItem } from './interface';
import {
  Box,
  ContainerLeft,
  ContainerText,
  CouponImage,
  Dot,
  Line,
  Name,
  Percent,
  Points,
  RightContainer,
  Wrapper
} from './styles';


export const CouponsCheckoutItems: React.FC<ICouponCheckoutItem> = (props) => {
  return (
    <Wrapper >
      <ContainerLeft >
        <Percent>{props.off} %</Percent>
        <Dot />
        <Line />
      </ContainerLeft>
      <RightContainer >
        <Box>
          <CouponImage source={{ uri: props.image }} />
        </Box>
        <ContainerText>
          <Name>{props.establishment_name}</Name>
          {/* TODO */}
          <Points>{props
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

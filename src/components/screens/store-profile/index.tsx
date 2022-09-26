import React from 'react';
import { Platform } from 'react-native'
import { colors } from '../../../../assets/constants/colors';
import { ClockIcon } from '../../../../assets/icons/clockIcon';
import { CouponIcon } from '../../../../assets/icons/coupon_icon';
import { RestaurantScreenProps } from "../../../settings/@types/@app-stack";
import { RestaurantInteractions } from '../../components_heavy/RestaurantInteractions';
import { BlocksWrapper, About, AboutSubtitle, BlocksValue, ContainerGetCoupon, ContainerImage, Container, IconsContainer, GetCouponText, RestaurantCategory, RestaurantName, Wrapper, NameContainer } from './styles';


const DATE_FORMAT: any = {
  formatMatcher: "best fit",
  hour: '2-digit',
  minute: '2-digit'
}

const StoreProfile: React.FC<RestaurantScreenProps> = ({ route }) => {



  const handleCouponCall = () => {

  }

  return (
    <Wrapper>
      <ContainerImage source={{ uri: `https://klubbs-establishment.s3.amazonaws.com/${route?.params?.image}` }} />

      <Container>

        <NameContainer >
          <RestaurantName>{route?.params?.name}</RestaurantName>
          <RestaurantCategory>{route?.params?.business_category_id}</RestaurantCategory>
        </NameContainer>

        <AboutSubtitle>Sobre</AboutSubtitle>
        <About>{route?.params?.description}</About>

        <IconsContainer>
          <BlocksWrapper>
            <ClockIcon width={14} height={14} fill={colors.COLOR_YELLOW_RATING} />
            <BlocksValue>
              {
                Platform.select({
                  ios: (() => route.params
                    .openedAt
                    .ToDateFormat()
                    .toLocaleTimeString("pt-br", DATE_FORMAT))(),
                  android: (() => route.params
                    .openedAt
                    .ToDateFormat()
                    .toLocaleTimeString("pt-br", DATE_FORMAT)
                    .slice(0, -3))()
                })
              }
              { } &#xB7; { }
              {
                Platform.select({
                  ios: (() => route.params
                    .closedAt
                    .ToDateFormat()
                    .toLocaleTimeString("pt-br", DATE_FORMAT))(),
                  android: (() => route.params
                    .closedAt
                    .ToDateFormat()
                    .toLocaleTimeString("pt-br", DATE_FORMAT)
                    .slice(0, -3))()
                })
              }
            </BlocksValue>
          </BlocksWrapper>
          <BlocksWrapper>
            <CouponIcon width={14} height={14} fill={colors.COLOR_YELLOW_RATING} />
            {/* TODO: AJUSTAR A PORCENTAGEM */}
            <BlocksValue>5%</BlocksValue>
          </BlocksWrapper>
        </IconsContainer>

        <RestaurantInteractions
          data={
            {
              lat: route.params.latitude,
              long: route.params.longitude,
              restaurantName: route.params.name
            }
          }
        />

      </Container>

      <ContainerGetCoupon
        disabled={true}
        onPress={handleCouponCall}
      >
        <GetCouponText>PEGAR CUPOM</GetCouponText>
      </ContainerGetCoupon>
    </Wrapper>
  )
}

export { StoreProfile };

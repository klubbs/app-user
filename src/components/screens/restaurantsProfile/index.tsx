import { Feather } from '@expo/vector-icons';
import React from 'react';
import colors from '../../../../assets/constants/colors';
import COLORS from '../../../../assets/constants/colors';
import { ClockIcon } from '../../../../assets/icons/clockIcon';
import { CouponIcon } from '../../../../assets/icons/coupon_icon';
import { RestaurantScreenProps } from "../../../settings/@types/IAppStackParams";
import UberButton from "../../components/buttonUber";
import { RestaurantInteractions } from '../../organisms/restaurantInteractions';
import { BlocksWrapper, About, AboutSubtitle, BlocksValue, ContainerGetCoupon, ContainerImage, Container, IconsContainer, GetCouponText, RestaurantCategory, RestaurantName, Wrapper, NameContainer } from './styles';



const Restaurant: React.FC<RestaurantScreenProps> = ({ route }) => {



  const handleCouponCall = () => {

  }

  return (
    <Wrapper>
      <ContainerImage source={{ uri: route?.params?.image }} />

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
                route.params
                  .openedAt.ToDateFormat()
                  .toLocaleTimeString("pt-br",
                    {
                      formatMatcher: "best fit",
                      hour: '2-digit',
                      minute: '2-digit'
                    })
              }
              { } &#xB7; { }
              {
                route.params
                  .closedAt.ToDateFormat()
                  .toLocaleTimeString("pt-br",
                    {
                      formatMatcher: "best fit",
                      hour: '2-digit',
                      minute: '2-digit'
                    })
              }
            </BlocksValue>
          </BlocksWrapper>
          <BlocksWrapper>
            <CouponIcon width={14} height={14} fill={colors.COLOR_YELLOW_RATING} />
            <BlocksValue>XX%</BlocksValue>
          </BlocksWrapper>
          {/* <UberButton onPress={handleUberCall} /> */}
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

      <ContainerGetCoupon onPress={handleCouponCall}>
        <GetCouponText>PEGAR CUPOM</GetCouponText>
      </ContainerGetCoupon>
    </Wrapper>
  )
}

export default Restaurant;

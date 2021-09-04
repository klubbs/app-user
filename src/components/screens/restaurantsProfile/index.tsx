import { Feather } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import React from 'react';
import colors from '../../../../assets/constants/colors';
import COLORS from '../../../../assets/constants/colors';
import { CouponIcon } from '../../../../assets/icons/coupon_icon';
import { RestaurantScreenProps } from "../../../settings/@types/IAppStackParams";
import UberButton from "../../component/buttonUber";
import TabRestaurants from '../../componentHeavy/restaurantsProfileTab';
import { BlocksWrapper, Description, BlocksValue, ContainerGetCoupon, ContainerImage, Container, ContainerUsual, GetCouponText, RestaurantCategory, RestaurantName, Wrapper, WrapperTop } from './styles';



const Restaurant: React.FC<RestaurantScreenProps> = ({ route }) => {

  const handleUberCall = () => {
    Linking.openURL(`uber://?client_id=e1P-SgdvK_PmQCLAq_815j4fjk5OxJ50&action=setPickup&pickup=my_location&dropoff[latitude]=${null}&dropoff[longitude]=${null}&dropoff[nickname]=${null}`)

  }

  const handleCouponCall = () => {

  }

  return (
    <Wrapper>
      <ContainerImage source={{ uri: route?.params?.image }} />

      <Container>

        <WrapperTop >
          <RestaurantName>{route?.params?.name}</RestaurantName>
          <RestaurantCategory>Pizzaria</RestaurantCategory>
        </WrapperTop>

        <ContainerUsual>
          <BlocksWrapper>
            {/*Icon Timer*/}
            <BlocksValue>10h - 22h</BlocksValue>
          </BlocksWrapper>
          <BlocksWrapper>
            <CouponIcon width={12} height={12} fill={colors.COLOR_SECUNDARY_BLACK} />
            <BlocksValue>10%</BlocksValue>
          </BlocksWrapper>
          {/* <UberButton onPress={handleUberCall} /> */}

          {/* <TabRestaurants /> */}
        </ContainerUsual>


      </Container>

      <ContainerGetCoupon onPress={handleCouponCall}>
        <GetCouponText>PEGAR CUPOM</GetCouponText>
      </ContainerGetCoupon>
    </Wrapper>
  )
}

export default Restaurant;

import { Feather } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import React from 'react';
import COLORS from '../../../../assets/constants/colors';
import { RestaurantScreenProps } from "../../../settings/navigation/interfaces/IAppStackParams";
import BadgesDescriptorLine from "../../component/badges_descriptor_line";
import UberButton from "../../component/button_uber";
import TabRestaurants from '../../component_heavy/restaurants_menu';
import { ContainerBadges, ContainerDescription, ContainerGetCoupon, ContainerIcons, ContainerImage, ContainerInformations, ContainerUsual, GetCouponText, RestaurantCategory, RestaurantName, Wrapper, WrapperTop } from './styles';



const Restaurant: React.FC<RestaurantScreenProps> = ({ route }) => {

  const handleUberCall = () => {
    Linking.openURL(`uber://?client_id=e1P-SgdvK_PmQCLAq_815j4fjk5OxJ50&action=setPickup&pickup=my_location&dropoff[latitude]=${null}&dropoff[longitude]=${null}&dropoff[nickname]=${null}`)

  }

  const handleCouponCall = () => {

  }

  return (
    <Wrapper>
      <ContainerImage source={{ uri: route?.params?.image }} />
      <ContainerInformations>

        <WrapperTop >
          <ContainerDescription >
            <RestaurantName>{route?.params?.name}</RestaurantName>
            <RestaurantCategory>{route?.params?.name}</RestaurantCategory>
          </ContainerDescription>
          <ContainerIcons >
            <Feather name={"phone"} size={20} color={COLORS.COLOR_BLACK80} onPress={() => console.log('BRASIL')} />
            <Feather name={"share"} size={20} color={COLORS.COLOR_BLACK80} onPress={() => console.log('BRASIL')} />
            <Feather name={"heart"} size={20} color={COLORS.COLOR_BLACK80} onPress={() => console.log('BRASIL')} />
          </ContainerIcons>
        </WrapperTop>

        <ContainerBadges >
          <BadgesDescriptorLine text={"Estabelecimento"} secundaryText={"Premium"} color={COLORS.COLOR_YELLOW} />
          <BadgesDescriptorLine text={"Horário"} secundaryText={"17:00 - 23:00"} color={COLORS.COLOR_SECUNDARY_BLACK} />
          <BadgesDescriptorLine text={"Classificação"} secundaryText={"4.5"} color={COLORS.COLOR_SECUNDARY_BLACK} icon={"star"} />
        </ContainerBadges>

        <ContainerUsual>
          <UberButton onPress={handleUberCall} />
        </ContainerUsual>

        <ContainerUsual>
          <TabRestaurants />
        </ContainerUsual>


      </ContainerInformations>
      <ContainerGetCoupon onPress={handleCouponCall}>
        <GetCouponText>PEGAR CUPOM</GetCouponText>
      </ContainerGetCoupon>
    </Wrapper>
  )
}

export default Restaurant;

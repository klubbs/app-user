import React, { useContext } from 'react';
import { View } from 'react-native';
import colors from '../../../../assets/constants/colors';
import { CouponIcon } from '../../../../assets/icons/coupon_icon';
import { MarkerTimeIcon } from '../../../../assets/icons/marker-time_icon';
import { Ratings } from '../ratings';
import { distanceInKm } from '../../../utils/distanceUtils'
import {
  Container,
  ContainerDescriptions,
  ContainerDistance,
  ContainerOff,
  ContainerToolbar,
  DistanceLocation,
  Image,
  OffCoupon,
  OpenCloseBadge,
  StablishmentCategory,
  EstablishmentName,
  Wrapper
} from './styles';
import { ICardEstablishmentProps } from './@types.ts';
import { HomeContext } from '../../../contexts/homeContext';


export const CardEstablishment: React.FC<ICardEstablishmentProps> = ({ data, onPress, userLocation }) => {

  // const { selectedCategory } = useContext(HomeContext)

  // if (selectedCategory !== data.business_category_id && selectedCategory !== '94d9ccaf-9a03-4b1d-9dc7-bec0931b1381') {
  //   return null;
  // }

  return (

    <Wrapper disabled={!onPress} onPress={onPress}>

      <Image source={{ uri: data.image }}>
        <OpenCloseBadge />
      </Image>

      <Container>
        <ContainerDescriptions>
          <EstablishmentName>{data?.name}</EstablishmentName>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <StablishmentCategory>Churrascaria</StablishmentCategory>
            <Ratings rating={3} />
          </View>

        </ContainerDescriptions>
        <ContainerToolbar>
          <ContainerOff>
            <CouponIcon fill={colors.COLOR_WHITE_80} width={15} height={13} />
            <OffCoupon>12%</OffCoupon>
          </ContainerOff>

          <ContainerDistance>
            <MarkerTimeIcon fill={colors.COLOR_WHITE_80} width={15} height={14} />
            <DistanceLocation>{
              distanceInKm(
                data.latitude ?? 0,
                data.longitude ?? 0,
                userLocation?.coords.latitude ?? 0,
                userLocation?.coords.longitude ?? 0)
                .toString().slice(0, 4)} km
            </DistanceLocation>
          </ContainerDistance>

        </ContainerToolbar>
      </Container>
    </Wrapper >
  );
}

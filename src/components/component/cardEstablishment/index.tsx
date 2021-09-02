import React, { useContext, useMemo, useEffect, useState } from 'react';
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
  MotifyImage,
  OffCoupon,
  OpenIndicator,
  StablishmentCategory,
  EstablishmentName,
  Wrapper,
  EmptyImage,
  EmptyShopIcon
} from './styles';
import { useAnimationState, AnimatePresence } from 'moti'
import { ICardEstablishmentProps } from './@types';
import { HomeContext } from '../../../contexts/homeContext';

export const CardEstablishment: React.FC<ICardEstablishmentProps> = ({ data, onPress, userLocation }) => {

  const { categories } = useContext(HomeContext)

  const categoryDesc = categories.find(item => item.id === data.business_category_id)?.description

  //TODO: Recuperar somente a hora
  const isOpen = data.closedAt < new Date().ToUnixEpoch() && data.openedAt < new Date().ToUnixEpoch()



  return (

    <Wrapper disabled={!onPress} onPress={onPress}>


      <AnimatePresence>
        <OpenIndicator open={isOpen} />

        {
          data.image &&
          <MotifyImage
            key={'content'}
            from={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0.2 }}
            source={{ uri: data.image }}
          />
        }

        {
          !data.image &&
          <EmptyImage
            key={'empty'}
          >
            <EmptyShopIcon />
          </EmptyImage>

        }
      </AnimatePresence>

      <Container>
        <ContainerDescriptions>
          <EstablishmentName>{data?.name}</EstablishmentName>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <StablishmentCategory>{categoryDesc}</StablishmentCategory>
            {/* <Ratings rating={3} /> */}
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

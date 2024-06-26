import React, { useContext, useRef } from 'react';
import { View, Animated } from 'react-native';
import { colors } from '../../../../assets/constants/colors';
import { CouponIcon } from '../../../../assets/icons/coupon_icon';
import { MarkerTimeIcon } from '../../../../assets/icons/marker-time_icon';
import { distanceInKm } from '../../../utils/geolocations';
import {
  Container,
  ContainerDescriptions,
  ContainerDistance,
  ContainerOff,
  ContainerToolbar,
  DistanceLocation,
  OffCoupon,
  Image,
  StablishmentCategory,
  EstablishmentName,
  Wrapper,
  EmptyImage,
  EmptyShopIcon,
} from './styles';
import { ICardEstablishmentProps } from './@types';
import { HomeContext } from '../../../contexts/home-context';

export const CardEstablishment: React.FC<ICardEstablishmentProps> = ({
  data,
  onPress,
  userLocation,
}) => {
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const { getCategoriesDescription } = useContext(HomeContext);

  Animated.timing(opacityAnim, {
    toValue: 1,
    duration: 350,
    useNativeDriver: true,
  }).start();

  return (
    <Wrapper disabled={!onPress} onPress={onPress}>
      {data.image && (
        <Image
          key={'content'}
          style={{ opacity: opacityAnim }}
          source={{
            uri: `https://klubbs-establishment.s3.amazonaws.com/${data.image}`,
          }}
        />
      )}
      {!data.image && (
        <EmptyImage key={'empty'}>
          <EmptyShopIcon />
        </EmptyImage>
      )}

      <Container>
        <ContainerDescriptions>
          <EstablishmentName>{data?.name}</EstablishmentName>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <StablishmentCategory>
              {getCategoriesDescription(data.business_category_id)}
            </StablishmentCategory>
          </View>
        </ContainerDescriptions>
        <ContainerToolbar>
          <ContainerOff>
            <CouponIcon fill={colors.COLOR_WHITE_80} width={15} height={13} />
            <OffCoupon>
              {Math.max.apply(null, data?.offers.length > 0 ? data?.offers.map((i) => i.off) : [0])}
              %
            </OffCoupon>
          </ContainerOff>

          <ContainerDistance>
            <MarkerTimeIcon fill={colors.COLOR_WHITE_80} width={15} height={14} />
            <DistanceLocation>
              {distanceInKm(
                data.latitude ?? 0,
                data.longitude ?? 0,
                userLocation?.coords.latitude ?? 0,
                userLocation?.coords.longitude ?? 0,
              )
                .toString()
                .slice(0, 4)}{' '}
              km
            </DistanceLocation>
          </ContainerDistance>
        </ContainerToolbar>
      </Container>
    </Wrapper>
  );
};

import React from 'react';
import { View } from 'react-native';
import colors from '../../../../assets/constants/colors';
import { CouponIcon } from '../../../../assets/icons/coupon_icon';
import { MarkerTimeIcon } from '../../../../assets/icons/marker-time_icon';
import { Ratings } from '../ratings';
import { IStablishmentCard } from './interfaces';
import { Container, ContainerDescriptions, ContainerDistance, ContainerOff, ContainerToolbar, DistanceLocation, Image, OffCoupon, OpenCloseBadge, StablishmentCategory, StablishmentName, Wrapper } from './styles';



const StablishmentCard: React.FC<IStablishmentCard> = (props) => {
  return (

    <Wrapper onPress={props.onPress}>
      <Image source={{ uri: props.uri }}>
        <OpenCloseBadge />
      </Image>
      <Container>
        <ContainerDescriptions>
          <View>
            <StablishmentName>{props.title}</StablishmentName>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 180 }}>

              <StablishmentCategory>Churrascaria</StablishmentCategory>

              <Ratings rating={3} />

            </View>

          </View>

        </ContainerDescriptions>
        <ContainerToolbar>
          <ContainerOff>
            <CouponIcon fill={colors.COLOR_WHITE_80} width={15} height={13} />
            <OffCoupon>12%</OffCoupon>
          </ContainerOff>

          <ContainerDistance>
            <MarkerTimeIcon fill={colors.COLOR_WHITE_80} width={15} height={14} />
            <DistanceLocation>1.2km</DistanceLocation>
          </ContainerDistance>

        </ContainerToolbar>
      </Container>
    </Wrapper >
  );
}

export default StablishmentCard;

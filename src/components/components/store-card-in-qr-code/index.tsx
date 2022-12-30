import React from 'react';
import { PressableProps } from 'react-native';
import { colors } from '../../../../assets/constants/colors';
import { CouponIcon } from '../../../../assets/icons/coupon_icon';
import { InfoIcon } from '../../../../assets/icons/info_icon';
import { IWalletCouponsResponseOfferData } from '../../../services/@types/@coupon-services';
import {
  Wrapper,
  EstablishmentImage,
  ContainerToolbar,
  ContainerOff,
  OffCoupon,
  EmptyImage,
  EmptyIcon,
} from './styles';

export const StoreCardInQrCode: React.FC<IWalletCouponsResponseOfferData & PressableProps> = (
  props,
) => {
  return (
    <Wrapper onPress={props.onPress}>
      {props.store_image && (
        <EstablishmentImage
          source={{ uri: `https://klubbs-establishment.s3.amazonaws.com/${props.store_image}` }}
        />
      )}

      {!props.store_image && (
        <EmptyImage>
          <EmptyIcon />
        </EmptyImage>
      )}

      <ContainerToolbar>
        <ContainerOff>
          <CouponIcon fill={colors.COLOR_WHITE_80} width={15} height={13} />
          <OffCoupon>{props.offer_percentage}%</OffCoupon>
        </ContainerOff>

        <ContainerOff>
          <InfoIcon fill={colors.COLOR_WHITE_80} width={15} height={13} />
        </ContainerOff>
      </ContainerToolbar>
    </Wrapper>
  );
};

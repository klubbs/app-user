import React from 'react';
import { PressableProps } from 'react-native';
import colors from '../../../../assets/constants/colors';
import { CouponIcon } from '../../../../assets/icons/coupon_icon';
import { InfoIcon } from '../../../../assets/icons/info_icon';
import { MarkerTimeIcon } from '../../../../assets/icons/marker-time_icon';
import { ShopIcon } from '../../../../assets/icons/shop_icon';

import { Wrapper, EstablishmentImage, ContainerToolbar, ContainerOff, OffCoupon, EmptyImage, EmptyIcon } from './styles';

export const EstablishmentCardQr: React.FC<{ image: string, off: number } & PressableProps> = (props) => {
  return (
    <Wrapper
      onLongPress={props.onLongPress}
    >

      {props.image && <EstablishmentImage source={{ uri: props.image }} />}

      {!props.image &&
        <EmptyImage>
          <EmptyIcon />
        </EmptyImage>
      }

      <ContainerToolbar>
        <ContainerOff>
          <CouponIcon fill={colors.COLOR_WHITE_80} width={15} height={13} />
          <OffCoupon>{props.off}%</OffCoupon>
        </ContainerOff>

        <ContainerOff>
          <InfoIcon fill={colors.COLOR_WHITE_80} width={15} height={13} />
        </ContainerOff>

      </ContainerToolbar>
    </Wrapper>
  );
}


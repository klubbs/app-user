import React from 'react';
import { PressableProps } from 'react-native';
import colors from '../../../../assets/constants/colors';
import { CouponIcon } from '../../../../assets/icons/coupon_icon';
import { InfoIcon } from '../../../../assets/icons/info_icon';
import { MarkerTimeIcon } from '../../../../assets/icons/marker-time_icon';

import { Wrapper, EstablishmentImage, ContainerToolbar, ContainerOff, OffCoupon } from './styles';

export const EstablishmentCardQr: React.FC<{ image: string, off: number } & PressableProps> = (props) => {
  return (
    <Wrapper
      onLongPress={props.onLongPress}
    >
      <EstablishmentImage
        source={{
          uri: 'https://www.infomoney.com.br/wp-content/uploads/2019/06/dominos-pizza-1.jpg?fit=900%2C450&quality=50&strip=all'
        }}
      />

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

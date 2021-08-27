import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import colors from '../../../../assets/constants/colors';
import { CouponQrScreenProps } from '../../../settings/navigation/interfaces/IAppStackParams';

import { BottomContainer, TopContainer, Wrapper, Off, Establishment, Influencer, ValidAt, BackgroundCoupon, InfluencerIcon, InfluencerContainer, SubtitleHelp, ImageEstablishment } from './styles';



export const CouponQrScreen: React.FC<CouponQrScreenProps> = ({ route }) => {


  return (
    <Wrapper>
      <ImageEstablishment source={require('../../../../assets/icon.png')} />
      <BackgroundCoupon />
      <TopContainer>
        <QRCode
          value={route?.params?.recommendation_coupon_code}
          logo={require('../../../../assets/logo_circle.png')}
          size={190}
          color={colors.COLOR_SECUNDARY_BLACK}
        />
      </TopContainer>

      <BottomContainer>
        <Off>{route?.params?.coupon_off_percentual}%</Off>
        <Establishment>{route?.params?.establishment_name}</Establishment>
        <InfluencerContainer>
          <InfluencerIcon />
          <Influencer>Gaba</Influencer>
        </InfluencerContainer>
        <ValidAt>Válido até {route?.params?.coupon_valid_at?.ToDateFormat()
          .toLocaleTimeString("pt-br",
            {
              formatMatcher: "best fit",
              day: 'numeric',
              month: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              year: '2-digit'
            })}</ValidAt>
        <SubtitleHelp>Atente o estabelecimento de validar seu cupom</SubtitleHelp>
      </BottomContainer>

    </Wrapper>
  );
}

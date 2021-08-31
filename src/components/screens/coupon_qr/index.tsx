import React, { useState } from 'react';
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';
import colors from '../../../../assets/constants/colors';
import { CouponQrScreenProps } from '../../../settings/navigation/interfaces/IAppStackParams';
import { EstablishmentCardQr } from '../../component/establishmentCardQr';
import { MotiView } from 'moti'

import { BottomContainer, TopContainer, Wrapper, Off, Establishment, Influencer, ValidAt, FlatListComponent, AnimatedWrapper, BackgroundCoupon, InfluencerIcon, InfluencerContainer, SubtitleHelp, ImageEstablishment } from './styles';
import { ModalCouponEstablishmentInfos } from '../../component_heavy/modalCouponEstablishmentInfos';
import { ICouponDetails } from './interfaces';

export const CouponQrScreen: React.FC<CouponQrScreenProps> = ({ route }) => {


  const [activeMasterCoupon, setActiveMasterCoupon] = useState<ICouponDetails | null>(null)

  function handlePressableCoupon(item: ICouponDetails) {
    setActiveMasterCoupon(item)
  }

  return (
    <Wrapper>
      <ImageEstablishment source={require('../../../../assets/icon.png')} />
      <BackgroundCoupon />
      <TopContainer>
        <QRCode
          value={route?.params?.coupon_code}
          logo={require('../../../../assets/logo_circle.png')}
          size={190}
          color={colors.COLOR_SECUNDARY_BLACK}
        />
      </TopContainer>

      <BottomContainer>

        <FlatListComponent
          data={route.params.master_coupons as ICouponDetails[]}
          keyExtractor={item => item.key}
          renderItem={({ item }) => {
            return (
              <AnimatedWrapper>
                <EstablishmentCardQr
                  onLongPress={() => handlePressableCoupon(item)}
                  off={item.master_coupon_off_percentual}
                  image={item.establishment_image}
                />
              </AnimatedWrapper>
            )
          }}
        />
        <SubtitleHelp>Atente o estabelecimento de validar seu cupom</SubtitleHelp>
      </BottomContainer>
      <ModalCouponEstablishmentInfos data={activeMasterCoupon} onClose={() => setActiveMasterCoupon(null)} />
    </Wrapper>
  );
}


{/* <ValidAt>Válido até {route?.params?.coupon_valid_at?.ToDateFormat()
          .toLocaleTimeString("pt-br",
            {
              formatMatcher: "best fit",
              day: 'numeric',
              month: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              year: '2-digit'
            })}</ValidAt> */}

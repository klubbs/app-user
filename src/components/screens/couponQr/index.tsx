import React, { useState, useContext } from 'react';
import QRCode from 'react-native-qrcode-svg';
import colors from '../../../../assets/constants/colors';
import { CouponQrScreenProps } from '../../../settings/@types/IAppStackParams';
import { EstablishmentCardQr } from '../../components/cardEstablishmentQr';
import { BottomContainer, TopContainer, Wrapper, FlatListComponent, AnimatedWrapper, BackgroundCoupon, SubtitleHelp, ImageEstablishment } from './styles';
import { MasterCouponDetailQrModal } from '../../screensModals/masterCouponDetailQrModal';
import { IMasterCouponQrDetails } from './types';
import { AuthContext } from '../../../contexts/authContext';


export const CouponQrScreen: React.FC<CouponQrScreenProps> = ({ route }) => {

  const { user } = useContext(AuthContext)

  const [activeMasterCoupon, setActiveMasterCoupon] = useState<IMasterCouponQrDetails | null>(null)

  function handlePressableCoupon(item: IMasterCouponQrDetails) {
    setActiveMasterCoupon(item)
  }

  return (
    <Wrapper>
      <ImageEstablishment source={require('../../../../assets/icon.png')} />
      <BackgroundCoupon />
      <TopContainer>
        <QRCode
          value={`${route?.params?.coupon_id}|${user?.id}`}
          logo={require('../../../../assets/logo_circle.png')}
          size={190}
          color={colors.COLOR_SECUNDARY_BLACK}
        />
      </TopContainer>

      <BottomContainer>

        <FlatListComponent
          data={route.params.master_coupons as IMasterCouponQrDetails[]}
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
      {
        activeMasterCoupon && <MasterCouponDetailQrModal data={activeMasterCoupon} onClose={() => setActiveMasterCoupon(null)} />
      }
    </Wrapper>
  );
}

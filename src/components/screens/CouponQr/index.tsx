import React, { useState, useContext } from 'react';
import { Dimensions, PixelRatio, View } from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import { colors } from '../../../../assets/constants/colors';
import { CouponQrScreenProps } from '../../../settings/@types/appStackTypes';
import { EstablishmentCardQr } from '../../components/CardEstablishmentQr';
import { QrCouponsRules } from '../../modals/QrCouponsRules';
import { AuthContext } from '../../../contexts/authContext';
import { UserIcon } from '../../../../assets/icons/user_icon';
import { IWalletCouponsResponseOfferData } from '../../../services/@types/couponServiceTypes';
import {
  ContainerCoupon,
  Wrapper,
  FlatListComponent,
  AnimatedWrapper,
  SubtitleHelp,
  ImageInfluencer,
  ContainerImage
} from './styles';
import { QrCouponBackground } from '../../../../assets/images/backgrounds/backgroundQrCoupon';

let key = 0;

export const CouponQrScreen: React.FC<CouponQrScreenProps> = ({ route }) => {

  const { user } = useContext(AuthContext)

  const [activeOffer, setActiveOffer] = useState<IWalletCouponsResponseOfferData | null>(null)

  function RenderInfluencerImage(): JSX.Element {

    if (route.params.influencer_image) {
      return (
        <ContainerImage>
          <UserIcon width={25} height={25} fill={colors.COLOR_BLACK40} />
        </ContainerImage>)
    }

    return (
      <ContainerImage>
        <ImageInfluencer source={{ uri: `https://yt3.ggpht.com/ytc/AKedOLTMo7dXbNtXLZb8ZfFANHMN8ukajWJIF-duv904Fw=s900-c-k-c0x00ffffff-no-rj` }} />
      </ContainerImage>
    )
  }


  return (
    <Wrapper>
      <ContainerCoupon>
        <QrCouponBackground />
      </ContainerCoupon>

      <RenderInfluencerImage />
      <QRCode
        value={`${route?.params?.coupon_id}|${user?.id}`}
        backgroundColor='transparent'
        logo={require('../../../../assets/images/klubbsLogoCircle.png')}
        size={Dimensions.get('window').width * 0.45}
        color={colors.COLOR_SECUNDARY_BLACK}
      />
      <FlatListComponent
        data={route.params.master_coupons}
        keyExtractor={item => `${++key}`}
        renderItem={({ item, index }: { item: IWalletCouponsResponseOfferData, index: number }) => {
          return (
            <AnimatedWrapper key={key}>
              <EstablishmentCardQr
                onPress={() => setActiveOffer(item)}
                off={item.master_coupon_off_percentual}
                image={item.establishment_image}
              />
            </AnimatedWrapper>
          )
        }}
      />
      <SubtitleHelp>Atente o estabelecimento de validar seu cupom</SubtitleHelp>
      {
        activeOffer &&
        <QrCouponsRules
          data={activeOffer}
          onClose={() => setActiveOffer(null)}
        />
      }
    </Wrapper>
  );
}

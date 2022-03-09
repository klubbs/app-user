import React, { useState, useContext } from 'react';
import { Dimensions, Platform } from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import { colors } from '../../../../assets/constants/colors';
import { CouponQrScreenProps } from '../../../settings/@types/appStackTypes';
import { EstablishmentCardQr } from '../../components/CardEstablishmentQr';
import { QrCouponsRules } from '../../modals/QrCouponsRules';
import { AuthContext } from '../../../contexts/authContext';
import { UserIcon } from '../../../../assets/icons/user_icon';
import { isIphoneX, isBiggerAndroid } from '../../../utils/dimensionsHelper';
import { IWalletCouponsResponseOfferData } from '../../../services/@types/couponServiceTypes';
import {
  BottomContainer,
  TopContainer,
  Wrapper,
  FlatListComponent,
  AnimatedWrapper,
  BackgroundCoupon,
  SubtitleHelp,
  ImageInfluencer,
  EmptyImage
} from './styles';

let key = 0;

export const CouponQrScreen: React.FC<CouponQrScreenProps> = ({ route }) => {

  const { user } = useContext(AuthContext)

  const [activeOffer, setActiveOffer] = useState<IWalletCouponsResponseOfferData | null>(null)

  function RenderEstablishmentCard({ item }: { item: IWalletCouponsResponseOfferData }): JSX.Element {
    return (
      <AnimatedWrapper>
        <EstablishmentCardQr
          onPress={() => setActiveOffer(item)}
          off={item.master_coupon_off_percentual}
          image={item.establishment_image}
        />
      </AnimatedWrapper>
    )
  }

  function RenderInfluencerImage(): JSX.Element {

    return (
      <>
        {
          route.params.influencer_image !== ''
          && <ImageInfluencer source={{ uri: route.params.influencer_image }} />
        }
        {!route.params.influencer_image &&
          <EmptyImage>
            <UserIcon width={25} height={25} fill={colors.COLOR_BLACK40} />
          </EmptyImage>
        }
      </>
    )
  }

  return (
    <Wrapper>
      <RenderInfluencerImage />
      <BackgroundCoupon />
      <TopContainer>
        <QRCode
          value={`${route?.params?.coupon_id}|${user?.id}`}
          logo={require('../../../../assets/images/klubbsLogoCircle.png')}
          size={Platform.select({
            ios: isIphoneX() ? 195 : 165,
            android: isBiggerAndroid() ? 180 : 150
          })}
          color={colors.COLOR_SECUNDARY_BLACK}
        />
      </TopContainer>

      <BottomContainer>

        <FlatListComponent
          data={route.params.master_coupons as IWalletCouponsResponseOfferData[]}
          keyExtractor={item => `${key}`}
          renderItem={({ item }) => {
            key++;
            return (<RenderEstablishmentCard key={key} item={item as IWalletCouponsResponseOfferData} />)
          }}
        />
        <SubtitleHelp>Atente o estabelecimento de validar seu cupom</SubtitleHelp>
      </BottomContainer>
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

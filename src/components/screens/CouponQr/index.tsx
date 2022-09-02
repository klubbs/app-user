import React, { useState, useContext } from 'react';
import { colors } from '../../../../assets/constants/colors';
import { CouponQrScreenProps } from '../../../settings/@types/@app-stack';
import { StoreCardInQrCode } from '../../components/store-card-in-qr-code';
import { ModalOfferRulesQrCode } from '../../modals/modal-offer-rules-qrcode';
import { AuthContext } from '../../../contexts/auth-context';
import { UserIcon } from '../../../../assets/icons/user_icon';
import { IWalletCouponsResponseOfferData } from '../../../services/@types/@coupon-services';
import { QrCouponBackground } from '../../../../assets/images/backgrounds/backgroundQrCoupon';
import {
  ContainerCoupon,
  Wrapper,
  FlatListComponent,
  AnimatedWrapper,
  SubtitleHelp,
  ImageInfluencer,
  ContainerImage,
  ContainerQr,
  QRCodeCoupon
} from './styles';

let key = 0;

export const CouponQrScreen: React.FC<CouponQrScreenProps> = ({ route }) => {

  const { user } = useContext(AuthContext)
  const [activeOffer, setActiveOffer] = useState<IWalletCouponsResponseOfferData | null>(null)

  function RenderInfluencerImage(): JSX.Element {

    if (!route.params.partner_image) {
      return (
        <ContainerImage>
          <UserIcon width={25} height={25} fill={colors.COLOR_BLACK40} />
        </ContainerImage>)
    }

    return (
      <ContainerImage>
        <ImageInfluencer source={{ uri: route.params.partner_image }} />
      </ContainerImage>
    )
  }

  function RenderModalIfEnable() {
    if (activeOffer) {
      return <ModalOfferRulesQrCode data={activeOffer} onClose={() => setActiveOffer(null)} />
    }

    return <></>
  }

  return (
    <Wrapper>
      <ContainerCoupon>
        <QrCouponBackground />
      </ContainerCoupon>

      <RenderInfluencerImage />
      <ContainerQr distanceInBottom={route.params?.offers?.length <= 0}>
        <QRCodeCoupon value={`${route?.params?.coupon_id}|${user?.id}`} />
      </ContainerQr>
      <FlatListComponent
        data={route.params?.offers}
        keyExtractor={({ }): any => `${++key}`}
        renderItem={({ item }: { item: IWalletCouponsResponseOfferData }) => {
          return (
            <AnimatedWrapper key={key}>
              <StoreCardInQrCode {...item} onPress={() => setActiveOffer(item)} />
            </AnimatedWrapper>
          )
        }}
      />
      <SubtitleHelp>Atente o estabelecimento de validar seu cupom</SubtitleHelp>
      <RenderModalIfEnable />
    </Wrapper>
  );
}

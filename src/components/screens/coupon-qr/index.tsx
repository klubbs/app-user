import React, { useState, useContext, useEffect } from 'react';
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
  SubtitleHelp,
  ImageInfluencer,
  ContainerImage,
  ContainerQr,
  QRCodeCoupon,
  CheckinButton,
  CheckinProgressButton,
} from './styles';
import { CheckoutContext } from '../../../contexts/checkout-context';
import { useNavigation } from '@react-navigation/native';

let key = 0;

export const CouponQrScreen: React.FC<CouponQrScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const { checkinStatus, handleCheckoutStatus, clearCheckinId } = useContext(CheckoutContext);
  const [enableDescriptionOffer, setEnableDescriptionOffer] =
    useState<IWalletCouponsResponseOfferData | null>(null);

  useEffect(() => {
    return function cleanUp() {
      clearCheckinId();
    };
  }, []);

  async function onCallCheckoutStatus() {
    if (checkinStatus.status === 'EMPTY_CHECKIN_ID') {
      navigation.navigate('CreateCheckin', route.params);
      return;
    }

    const isSuccess = await handleCheckoutStatus();

    if (isSuccess == 'SUCCESS') {
      navigation.goBack();
    }
  }

  function RenderInfluencerImage(): JSX.Element {
    if (!route.params.partner_image) {
      return (
        <ContainerImage>
          <UserIcon width={25} height={25} fill={colors.COLOR_BLACK40} />
        </ContainerImage>
      );
    }

    return (
      <ContainerImage>
        <ImageInfluencer source={{ uri: route.params.partner_image }} />
      </ContainerImage>
    );
  }

  function RenderModalIfEnable() {
    if (enableDescriptionOffer) {
      return (
        <ModalOfferRulesQrCode
          data={enableDescriptionOffer}
          onClose={() => setEnableDescriptionOffer(null)}
        />
      );
    }

    return null;
  }

  function RenderQrComponent() {
    if (checkinStatus.status === 'EMPTY_CHECKIN_ID') {
      return <CheckinButton onPress={onCallCheckoutStatus} />;
    }

    if (checkinStatus.status === 'CHECKIN') {
      return (
        <ContainerQr distanceInBottom={route.params?.offers?.length <= 0}>
          <QRCodeCoupon value={`${user?.id}|${checkinStatus.id}|${route.params.wallet_id}`} />
        </ContainerQr>
      );
    }

    return <></>;
  }

  function RenderOutsideBottom() {
    if (checkinStatus.status === 'CHECKIN') {
      return (
        <React.Fragment>
          <SubtitleHelp>Atente o estabelecimento de concluir o checkout</SubtitleHelp>
          <CheckinProgressButton onPress={onCallCheckoutStatus} />
        </React.Fragment>
      );
    }

    return <SubtitleHelp>Inicie um checkin para gerar o QR CODE do seu cupom</SubtitleHelp>;
  }

  return (
    <Wrapper>
      <ContainerCoupon>
        <QrCouponBackground />
      </ContainerCoupon>

      <RenderInfluencerImage />

      <RenderQrComponent />

      <FlatListComponent
        data={route.params?.offers}
        keyExtractor={({}): any => `${++key}`}
        renderItem={({ item }: { item: IWalletCouponsResponseOfferData }) => {
          return <StoreCardInQrCode {...item} onPress={() => setEnableDescriptionOffer(item)} />;
        }}
      />
      <RenderOutsideBottom />
      <RenderModalIfEnable />
    </Wrapper>
  );
};

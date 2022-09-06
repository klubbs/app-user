import React, { useState, useContext, useEffect } from 'react';
import { colors } from '../../../../assets/constants/colors';
import { CouponQrScreenProps } from '../../../settings/@types/@app-stack';
import { StoreCardInQrCode } from '../../components/store-card-in-qr-code';
import { ModalOfferRulesQrCode } from '../../modals/modal-offer-rules-qrcode';
import { AuthContext } from '../../../contexts/auth-context';
import { UserIcon } from '../../../../assets/icons/user_icon';
import { IWalletCouponsResponseOfferData } from '../../../services/@types/@coupon-services';
import { QrCouponBackground } from '../../../../assets/images/backgrounds/backgroundQrCoupon';
import { useNavigation } from '@react-navigation/native';
import {
  ContainerCoupon,
  Wrapper,
  FlatListComponent,
  AnimatedWrapper,
  SubtitleHelp,
  ImageInfluencer,
  ContainerImage,
  ContainerQr,
  QRCodeCoupon,
  CheckoutButton
} from './styles';
import { CheckoutContext } from '../../../contexts/checkout-context';
import { CheckoutService } from '../../../services/checkout-service';
import { NotificationsFlash } from '../../../utils/flash-notifications';
import { Spinner } from '../../components/spinner';

let key = 0;

export const CouponQrScreen: React.FC<CouponQrScreenProps> = ({ route }) => {

  const navigation = useNavigation()

  const { user } = useContext(AuthContext)
  const { checkinID, handleCheckoutStatus, clearCheckinId } = useContext(CheckoutContext)

  const [enableDescriptionOffer, setEnableDescriptionOffer] = useState<IWalletCouponsResponseOfferData | null>(null)
  const [loading, setLoading] = useState(false)
  const inLiveCheckin = checkinID !== null;

  //TODO use effect

  useEffect(() => {

    return function cleanUp() {
      clearCheckinId()
    }

  }, [])

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
    if (enableDescriptionOffer) {
      return <ModalOfferRulesQrCode data={enableDescriptionOffer} onClose={() => setEnableDescriptionOffer(null)} />
    }

    return <></>
  }

  async function handleGetCheckoutStatus() {
    try {

      if (!checkinID) {
        return;
      }

      setLoading(true)

      const checkoutStatus = await CheckoutService.getCheckoutStatus(checkinID);

      handleCheckoutStatus({ checkoutId: checkoutStatus.checkout_id, isCheckinStatus: checkoutStatus.is_checkin })

      if (checkoutStatus.is_checkin) {
        NotificationsFlash.customMessage('Checkout em andamento', 'O estabelecimento ainda não finalizou o checkout', 'NEUTRAL')
      } else {
        NotificationsFlash.customMessage('Checkout finalizado', 'O estabelecimento finalizou o checkout', 'SUCCESS')
      }

    } catch (error) {
      NotificationsFlash.spillCoffee()
    } finally {

      setLoading(false)
    }
  }

  async function handleCheckout() {
    if (inLiveCheckin) {
      await handleGetCheckoutStatus();
    } else {
      navigation.navigate('CreateCheckin', route.params)
    }
  }


  return (
    <Wrapper>
      <Spinner loading={loading} />
      <ContainerCoupon>
        <QrCouponBackground />
      </ContainerCoupon>

      <RenderInfluencerImage />
      <ContainerQr distanceInBottom={route.params?.offers?.length <= 0}>
        <QRCodeCoupon value={`${user?.id}|${checkinID}|${route.params.wallet_id}`} />
      </ContainerQr>
      <FlatListComponent
        data={route.params?.offers}
        keyExtractor={({ }): any => `${++key}`}
        renderItem={({ item }: { item: IWalletCouponsResponseOfferData }) => {
          return (
            <AnimatedWrapper key={key}>
              <StoreCardInQrCode {...item} onPress={() => setEnableDescriptionOffer(item)} />
            </AnimatedWrapper>
          )
        }}
      />
      <SubtitleHelp>Atente o estabelecimento de concluir o checkout</SubtitleHelp>
      <CheckoutButton onPress={handleCheckout} disableCheckin={inLiveCheckin} />
      <RenderModalIfEnable />
    </Wrapper>
  );
}

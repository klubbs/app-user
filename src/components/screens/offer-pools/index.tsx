import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import { ChevronIcon } from '../../components/ChevronRight';
import {
  ItemWrapper,
  ScreenContainer,
  StoreImage,
  ContainerDescriptions,
  StoreName,
  Subtitle,
  EmptyShopContainer,
  EmptyShopIcon,
  BadgeContainer,
  BadgeText,
  ContainerNotFound,
  EmptySubtitle,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { HomeContext } from '../../../contexts/home-context';
import { colors } from '../../../../assets/constants/colors';
import { formatCurrency } from '../../../utils/formatersUtils';
import { OfferPoolsScreenProps } from '../../../settings/@types/@app-stack';
import { NotFoundRestaurants } from '../../../../assets/images/notFounds/notFoundRestaurants';
import ModalFluxOffer from '../../modals/modal-flux-offer';
import { TOfferSelected } from '../../modals/modal-offer-rules-qrcode';
import { CouponService } from '../../../services/coupon-service';
import { NotificationsFlash } from '../../../utils/flash-notifications';

export type TPoolOffer = {
  storeId: string;
  store: string;
  id: string;
  off: number;
  image?: string;
  couponCode: string;
  couponId: string;
  storeName: string;
  storeImage: string;
  minTicket: number;
};

const TYPE_BY_OFF = {
  HIGH: { max: 100, min: 50 },
  MEDIUM: { max: 49, min: 30 },
  LOW: { max: 29, min: 0 },
};

export const OfferPools: React.FC<OfferPoolsScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { klubbsOffers, getKlubbsOffersAsync } = useContext(HomeContext);

  const [offer, setOffer] = useState<TOfferSelected & { storeName: string; storeImage: string }>(
    {} as any,
  );
  const [enableModal, setEnableModal] = useState(false);

  const filteredPool = klubbsOffers.filter(
    (x) =>
      x.off >= TYPE_BY_OFF[route.params.type].min && x.off <= TYPE_BY_OFF[route.params.type].max,
  );

  function handlePress(item: TPoolOffer) {
    setOffer({
      id: item.id,
      coupon_code: item.couponCode,
      coupon_id: item.couponId,
      min_ticket: item.minTicket,
      off: item.off,
      partner_image: item.storeImage,
      storeName: item.storeName,
      storeImage: item.storeImage,
    });

    setEnableModal(true);
  }

  function LoadingOrEmptyRender() {
    return (
      <ContainerNotFound>
        <NotFoundRestaurants height={160} />
        <EmptySubtitle>Ainda não liberamos nada por aqui</EmptySubtitle>
      </ContainerNotFound>
    );
  }

  function handleStartCheckin() {
    setEnableModal(!enableModal);

    navigation.navigate('CreateCheckin', {
      flux: 'KLUBBS_FLUX',
      coupon_code: offer.coupon_code,
      coupon_id: offer.coupon_id,
      partner_image: offer.partner_image,
      offers: [
        {
          offer_id: offer.id,
          store_name: offer.storeName,
          store_image: offer.storeImage,
          offer_ticket: offer.min_ticket,
          offer_percentage: offer.off,
        },
      ],
    });
  }

  async function handleSaveInWallet() {
    try {
      await CouponService.putOfferInOwnCoupon(offer.id);

      NotificationsFlash.customMessage(
        'Proonto, ta lá !',
        'Atualizamos o seu cupom, la na sua carteira',
        'SUCCESS',
      );
    } catch (error) {
      NotificationsFlash.customMessage(
        'Não conseguimos salvar na sua carteira',
        'Me desculpe, ocorreu um erro inesperado',
        'WARNING',
      );
    } finally {
      setEnableModal(!enableModal);
    }
  }

  return (
    <ScreenContainer>
      <FlatList
        data={filteredPool}
        keyExtractor={(item, _: number) => item.id}
        contentContainerStyle={{ paddingTop: 80 }}
        ListEmptyComponent={LoadingOrEmptyRender}
        onRefresh={getKlubbsOffersAsync}
        renderItem={({ item }: { item: TPoolOffer }) => {
          return (
            <ItemWrapper onPress={() => handlePress(item)}>
              {item.image && (
                <StoreImage
                  source={{
                    uri: `https://klubbs-establishment.s3.amazonaws.com/${item.image}`,
                  }}
                />
              )}
              {!item.image && (
                <EmptyShopContainer>
                  <EmptyShopIcon />
                </EmptyShopContainer>
              )}
              <ContainerDescriptions>
                <View>
                  <StoreName>{item.store}</StoreName>
                  <Subtitle>{item.off}% desconto</Subtitle>
                </View>
                <BadgeContainer>
                  <Feather name={'chevrons-up'} size={12} color={colors.COLOR_SECOND_GREEN} />
                  <BadgeText>{formatCurrency(item.minTicket)}</BadgeText>
                </BadgeContainer>
              </ContainerDescriptions>
              <ChevronIcon />
            </ItemWrapper>
          );
        }}
      />
      <ModalFluxOffer
        enable={enableModal}
        onClose={() => setEnableModal(!enableModal)}
        walletCb={handleSaveInWallet}
        checkinCb={handleStartCheckin}
      />
    </ScreenContainer>
  );
};

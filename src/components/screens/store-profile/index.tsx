import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../../assets/constants/colors';
import { ClockIcon } from '../../../../assets/icons/clockIcon';
import { StoreScreenProps } from '../../../settings/@types/@app-stack';
import { ChevronIcon } from '../../components/ChevronRight';
import { RestaurantInteractions } from '../../components_heavy/RestaurantInteractions';
import {
  BlocksWrapper,
  HeaderSubtitle,
  HeaderTitle,
  BlocksValue,
  ImageStore,
  Container,
  StoreCategory,
  StoreName,
  Wrapper,
  StoreNameWrapper,
  StoreCategoryContainer,
  OfferDescription,
  UseThisOffer,
  WrapperOffer,
  OfferContainer,
  TicketMinimum,
  OfferOff,
  InteractionsWrapper,
  YellowContainer,
  ImageContainer,
  HeaderContainer,
} from './styles';
import { formatCurrency, formatHour } from '../../../utils/formatersUtils';
import { NotificationsFlash } from '../../../utils/flash-notifications';
import { CouponService } from '../../../services/coupon-service';
import ModalFluxOffer from '../../modals/modal-flux-offer';
import { TOfferSelected } from '../../modals/modal-offer-rules-qrcode';
import { ScrollView } from 'react-native-gesture-handler';

const StoreProfile: React.FC<StoreScreenProps> = ({ route }) => {
  const navigation = useNavigation();

  const [enableFluxOfferModal, setEnableFluxOfferModal] = useState(false);
  const [offer, setOffer] = useState<TOfferSelected>({} as any);

  function handleSelectOffer(offer: TOfferSelected) {
    setOffer(offer);
    setEnableFluxOfferModal(!enableFluxOfferModal);
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
      setEnableFluxOfferModal(!enableFluxOfferModal);
    }
  }

  function handleStartCheckin() {
    setEnableFluxOfferModal(!enableFluxOfferModal);

    navigation.navigate('CreateCheckin', {
      flux: 'KLUBBS_FLUX',
      coupon_code: offer.coupon_code,
      coupon_id: offer.coupon_id,
      partner_image: offer.partner_image,
      offers: [
        {
          offer_id: offer.id,
          store_image: route.params.image,
          store_name: route.params.name,
          offer_ticket: offer.min_ticket,
          offer_percentage: offer.off,
        },
      ],
    });
  }

  return (
    <Wrapper>
      <ImageContainer>
        <YellowContainer>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
            <ChevronIcon right={false} light />
          </TouchableOpacity>
        </YellowContainer>
        {/* Sem imagem */}
        <ImageStore
          source={{
            uri: `https://klubbs-establishment.s3.amazonaws.com/${route?.params?.image}`,
          }}
        />
      </ImageContainer>
      <Container>
        <StoreNameWrapper>
          <StoreName>{route?.params?.name}</StoreName>
          <StoreCategoryContainer>
            <StoreCategory>{route?.params?.business_category_id}</StoreCategory>
          </StoreCategoryContainer>
          <BlocksWrapper>
            <ClockIcon width={14} height={14} fill={colors.COLOR_YELLOW_RATING} />
            <BlocksValue>
              {formatHour(route.params.openedAt)} {} &#xB7; {} {formatHour(route.params.closedAt)}
            </BlocksValue>
          </BlocksWrapper>
        </StoreNameWrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={route.params.offers}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ width: '100%', marginTop: 20 }}
            ListHeaderComponent={() => {
              return (
                <HeaderContainer>
                  <HeaderTitle>Todas as ofertas</HeaderTitle>
                  <HeaderSubtitle>Válidas para utilizar hoje</HeaderSubtitle>
                </HeaderContainer>
              );
            }}
            renderItem={({ item }) => {
              return (
                <WrapperOffer onPress={() => handleSelectOffer(item)}>
                  <OfferDescription>
                    <UseThisOffer>Ativar oferta</UseThisOffer>
                    <TicketMinimum>
                      {item.min_ticket === 0
                        ? 'Sem valor mínimo'
                        : `Pagando mais de ${formatCurrency(item?.min_ticket)}`}
                    </TicketMinimum>
                  </OfferDescription>
                  <OfferContainer>
                    <OfferOff>{item?.off}%</OfferOff>
                  </OfferContainer>
                </WrapperOffer>
              );
            }}
          />
          <InteractionsWrapper>
            <RestaurantInteractions
              data={{
                lat: route.params.latitude,
                long: route.params.longitude,
                restaurantName: route.params.name,
              }}
            />
          </InteractionsWrapper>
        </ScrollView>
        <ModalFluxOffer
          enable={enableFluxOfferModal}
          onClose={() => setEnableFluxOfferModal(!enableFluxOfferModal)}
          walletCb={handleSaveInWallet}
          checkinCb={handleStartCheckin}
        />
      </Container>
    </Wrapper>
  );
};

export { StoreProfile };

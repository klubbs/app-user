import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ModalComponent } from '../../components/Modal';
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
  ContainerModal,
  HeaderContainer,
} from './styles';
import { formatCurrency, formatHour } from '../../../utils/formatersUtils';
import { MenuItem } from '../../components/MenuItem';
import { Spinner } from '../../components/spinner';
import { NotificationsFlash } from '../../../utils/flash-notifications';
import { CouponService } from '../../../services/coupon-service';

const StoreProfile: React.FC<StoreScreenProps> = ({ route }) => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [enableFluxOfferModal, setEnableFluxOfferModal] = useState(false);

  async function handleSaveInWallet(couponCode: string) {
    try {
      setLoading(true);

      await CouponService.saveCouponInWallet(couponCode);

      setEnableFluxOfferModal(!enableFluxOfferModal);

      NotificationsFlash.customMessage(
        'Proonto, ta lá !',
        'Salvamos essa oferta na sua carteira, dentro do seu cupom',
        'SUCCESS',
      );
    } catch (error) {
      NotificationsFlash.customMessage(
        'Não conseguimos salvar na sua carteira',
        'Me desculpe, ocorreu um erro inesperado',
        'WARNING',
      );
    } finally {
      setLoading(false);
    }
  }

  function handleStartCheckin(checkinData: {
    couponId: string;
    couponCode: string;
    partnerImage: string;
    offer: {
      id: string;
      off: number;
      minTicket: number;
      workingDays: number[];
      storeName: string;
      storeImage: string;
    };
  }) {
    setEnableFluxOfferModal(!enableFluxOfferModal);

    navigation.navigate('CreateCheckin', {
      flux: 'KLUBBS_FLUX',
      coupon_code: checkinData.couponCode,
      coupon_id: checkinData.couponId,
      partner_image: checkinData.partnerImage,
      offers: [
        {
          offer_id: checkinData.offer.id,
          store_name: checkinData.offer.storeName,
          store_image: checkinData.offer.storeImage,
          offer_ticket: checkinData.offer.minTicket,
          offer_percentage: checkinData.offer.off,
        },
      ],
    });
  }

  return (
    <Wrapper>
      <Spinner loading={loading} />
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
              <WrapperOffer onPress={() => setEnableFluxOfferModal(!enableFluxOfferModal)}>
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
                <ModalComponent
                  visible={enableFluxOfferModal}
                  onClose={() => {
                    setEnableFluxOfferModal(!enableFluxOfferModal);
                  }}
                >
                  <ContainerModal>
                    <MenuItem
                      key={'checkin'}
                      text={'Iniciar checkin agora'}
                      description={'To preparado(a) para usar'}
                      icon={'circle'}
                      cb={() =>
                        handleStartCheckin({
                          couponId: item.coupon_id,
                          couponCode: item.coupon_code,
                          partnerImage: item.partner_image,
                          offer: {
                            id: item.id,
                            minTicket: item.min_ticket,
                            off: item.off,
                            storeImage: route.params.image,
                            storeName: route.params.name,
                            workingDays: item.working_days,
                          },
                        })
                      }
                    />
                    <MenuItem
                      key={'wallet'}
                      text={'Quero salvar na minha carteira'}
                      description={'Talvez eu vá usar depois'}
                      icon={'tag'}
                      cb={() => handleSaveInWallet(item.coupon_code)}
                    />
                  </ContainerModal>
                </ModalComponent>
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
      </Container>
    </Wrapper>
  );
};

export { StoreProfile };

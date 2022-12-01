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
} from './styles';
import { formatCurrency, formatHour } from '../../../utils/formatersUtils';
import { MenuItem } from '../../components/MenuItem';
import { Spinner } from '../../components/spinner';
import { NotificationsFlash } from '../../../utils/flash-notifications';
import { CouponCode } from '../../components/Coupon/styles';

const StoreProfile: React.FC<StoreScreenProps> = ({ route }) => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [enableFluxOfferModal, setEnableFluxOfferModal] = useState(false);

  async function handleSaveInWallet() {
    try {
      setLoading(true);

      //TODO: Chamar API aqui para salvar na carteira do usuário

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
      coupon_code: checkinData.couponCode,
      coupon_id: checkinData.couponId,
      partner_image: checkinData.partnerImage,
      offers: [
        {
          offer_id: checkinData.offer.id,
          store_name: checkinData.offer.store_name,
          store_image: checkinData.offer.store_image,
          offer_ticket: checkinData.offer.min_ticket,
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
        <ImageStore
          source={{
            uri: 'https://i0.wp.com/sarapateando.com.br/wp-content/uploads/2021/05/47b15ddd-6b2b-4926-a3b7-57bb9e08abda.jpg?fit=1280%2C960&ssl=1',
            // uri: `https://klubbs-establishment.s3.amazonaws.com/${route?.params?.image}`
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
              <>
                {/* <HeaderTitle>Sem ofertas no momento</HeaderTitle>
              <HeaderSubtitle>Esse estabelecimento ainda não liberou nenhuma oferta</HeaderSubtitle> */}

                <HeaderTitle>Todas as ofertas</HeaderTitle>
                <HeaderSubtitle>Válidas para utilizar hoje</HeaderSubtitle>
              </>
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
                  onClose={() => setEnableFluxOfferModal(!enableFluxOfferModal)}
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
                          partnerImage: item.partner_iamge,
                          offer: {
                            id: item.id,
                            minTicket: item.min_ticket,
                            off: item.off,
                            storeImage: item.store_image,
                            storeName: item.store_name,
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
                      cb={handleSaveInWallet}
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

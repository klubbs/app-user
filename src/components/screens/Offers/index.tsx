import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import colors from '../../../../assets/constants/colors';
import { CouponIcon } from '../../../../assets/icons/coupon_icon';
import { InfluencerService } from '../../../services/influencerService';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { BagTab } from '../../components/BagTab';
import { CardOffers } from '../../organisms/CardOffers';
import { ICardOffersProps } from '../../organisms/CardOffers/@types';
import { LinkCouponOffers } from '../../screensModals/LinkCouponOffers';
import { useNavigation } from '@react-navigation/native';
import { NotFoundRestaurants } from '../../../../assets/images/notFounds/notFoundRestaurants';
import * as Haptic from 'expo-haptics';
import {
  Wrapper,
  Header,
  ContainerItems,
  Items,
  CouponWrapper,
  ItemsSubtitle,
  ContainerNotFound,
  EmptyTitle, EmptySubtitle
} from './styles';


export const Offers: React.FC = () => {

  const [offers, setOffers] = useState<ICardOffersProps[]>([])
  const [selectedOffers, setSelectedOffer] = useState<{ masterCouponId: string, establishmentId: string }[]>([])
  const [modalLinkShow, setModalLinkShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation();

  useEffect(() => {
    getOffers()
  }, [])

  async function getOffers() {

    try {
      setLoading(true)

      var response = await InfluencerService.getAllOffers();

      setOffers(response);
    } catch (error) {
      NotificationsFlash.SpillCoffee();
    } finally {
      setLoading(false)
    }
  }

  function handleOfferSelect(isSelected: boolean, masteCouponId: string, establishmentId: string) {
    isSelected
      ? setSelectedOffer([...selectedOffers, { masterCouponId: masteCouponId, establishmentId: establishmentId }])
      : setSelectedOffer(selectedOffers.filter(item => item.masterCouponId !== masteCouponId));
  }

  function handleOpenBagTab() {
    const uniqueEstablishmentsId = [...new Set(selectedOffers.map(a => a.establishmentId))];

    let errors: any[] = []

    uniqueEstablishmentsId.forEach(element => {

      let matchs = selectedOffers.filter(item => item.establishmentId === element)

      if (matchs.length > 1) {
        errors.push(matchs)
        return;
      }

    });


    if (errors.length >= 1) {

      Haptic.notificationAsync(Haptic.NotificationFeedbackType.Warning)

      NotificationsFlash.CustomMessage(
        "Ofertas do mesmo estabelecimento",
        "Cada cupom seu só pode ser associado a 1 oferta do mesmo estabelecimento"
      )

      return;
    }

    setModalLinkShow(true)
  }

  function OffersBagTab(): JSX.Element {

    return (
      <BagTab show={selectedOffers.length > 0} onPress={handleOpenBagTab}>
        <ContainerItems>
          <ItemsSubtitle>Definir meu cupom</ItemsSubtitle>
          <CouponWrapper>
            <CouponIcon width={15} height={15} fill={colors.COLOR_WHITE} style={{ marginRight: 5 }} />
            <Items>{selectedOffers.length}</Items>
          </CouponWrapper>
        </ContainerItems>
      </BagTab >
    )
  }

  function onCloseLinkModal(cancel?: boolean) {
    if (!cancel)
      navigation.goBack()

    setModalLinkShow(false);
  }

  function LoadingOrEmptyRender() {
    return (
      <ContainerNotFound>
        <NotFoundRestaurants height={160} />
        <EmptyTitle>Eita</EmptyTitle>
        <EmptySubtitle>Nenhum estabelecimento liberou oferta ainda</EmptySubtitle>
      </ContainerNotFound>
    )
  }


  return (
    <Wrapper>
      <FlatList
        data={offers}
        onRefresh={getOffers}
        refreshing={loading}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.master_coupon_id}
        ListHeaderComponent={() => <Header>Disponíveis</Header>}
        ListEmptyComponent={LoadingOrEmptyRender}
        renderItem={({ item }) =>
          <CardOffers
            {...item}
            onPress={(isSelected: boolean) => handleOfferSelect(isSelected, item.master_coupon_id, item.establishment_id)} />
        }
      />
      {modalLinkShow && <LinkCouponOffers masterCoupons={selectedOffers} visible={modalLinkShow} onClose={onCloseLinkModal} />}
      <OffersBagTab />
    </Wrapper >
  );
}


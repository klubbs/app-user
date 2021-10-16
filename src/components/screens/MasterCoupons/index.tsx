import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import colors from '../../../../assets/constants/colors';
import { CouponIcon } from '../../../../assets/icons/coupon_icon';
import { InfluencerService } from '../../../services/influencerService';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { BagTab } from '../../components/BagTab';
import { CardMasterCoupons } from '../../organisms/CardMasterCoupons';
import { ICardMasterCouponsProps } from '../../organisms/CardMasterCoupons/@types';
import { LinkMasterCoupons } from '../../screensModals/LinkMasterCoupons';
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
import { SpinnerLoading } from '../../components/Spinner';


export const MasterCoupons: React.FC = () => {

  const [masterCoupons, setMasterCoupons] = useState<ICardMasterCouponsProps[]>([])
  const [selectedMasters, setSelectedMaster] = useState<{ masterCouponId: string, establishmentId: string }[]>([])
  const [modalLinkShow, setModalLinkShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation();

  useEffect(() => {
    getMasterCoupons()
  }, [])

  async function getMasterCoupons() {

    try {
      setLoading(true)

      var response = await InfluencerService.getAllMasterCoupons();

      setMasterCoupons(response);
    } catch (error) {
      NotificationsFlash.SpillCoffee();
    } finally {
      setLoading(false)
    }
  }

  function handleCouponSelect(isSelected: boolean, masteCouponId: string, establishmentId: string) {
    isSelected
      ? setSelectedMaster([...selectedMasters, { masterCouponId: masteCouponId, establishmentId: establishmentId }])
      : setSelectedMaster(selectedMasters.filter(item => item.masterCouponId !== masteCouponId));
  }

  function handleOpenBagTab() {
    const uniqueEstablishmentsId = [...new Set(selectedMasters.map(a => a.establishmentId))];

    let errors: any[] = []

    uniqueEstablishmentsId.forEach(element => {

      let matchs = selectedMasters.filter(item => item.establishmentId === element)

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

  function CouponsBagTab(): JSX.Element {

    return (
      <BagTab show={selectedMasters.length > 0} onPress={handleOpenBagTab}>
        <ContainerItems>
          <ItemsSubtitle>Definir meu cupom</ItemsSubtitle>
          <CouponWrapper>
            <CouponIcon width={15} height={15} fill={colors.COLOR_WHITE} style={{ marginRight: 5 }} />
            <Items>{selectedMasters.length}</Items>
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
        <EmptySubtitle>Nenhum estabelecimento liberou cupom ainda</EmptySubtitle>
      </ContainerNotFound>
    )
  }


  return (
    <Wrapper>
      <FlatList
        data={masterCoupons}
        onRefresh={getMasterCoupons}
        refreshing={loading}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.master_coupon_id}
        ListHeaderComponent={() => <Header>Disponíveis</Header>}
        ListEmptyComponent={LoadingOrEmptyRender}
        renderItem={({ item }) =>
          <CardMasterCoupons
            {...item}
            onPress={(isSelected: boolean) => handleCouponSelect(isSelected, item.master_coupon_id, item.establishment_id)} />
        }
      />
      {modalLinkShow && <LinkMasterCoupons masterCoupons={selectedMasters} visible={modalLinkShow} onClose={onCloseLinkModal} />}
      <CouponsBagTab />
    </Wrapper >
  );
}


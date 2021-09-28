import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import colors from '../../../../assets/constants/colors';
import { CouponIcon } from '../../../../assets/icons/coupon_icon';
import { InfluencerService } from '../../../services/influencerService';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { BagTab } from '../../components/bagTab';
import { CardMasterCoupons } from '../../organisms/cardMasterCoupons';
import { ICardMasterCouponsProps } from '../../organisms/cardMasterCoupons/@types';
import { LinkCouponModal } from '../../screensModals/linkCouponModal';
import { useNavigation } from '@react-navigation/native';
import { NotFoundRestaurants } from '../../../../assets/images/notFoundRestaurants';

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
import { SpinnerLoading } from '../../components/spinner';


export const MasterCoupons: React.FC = () => {

  const [masterCoupons, setMasterCoupons] = useState<ICardMasterCouponsProps[]>([])
  const [selectedMasters, setSelectedMaster] = useState<{ masterCouponId: string, establishmentId: string }[]>([])
  const [modalLinkShow, setModalLinkShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation();

  useEffect(() => {

    (async function getMasterCoupons() {

      try {
        setLoading(true)

        var response = await InfluencerService.getAllMasterCoupons();
        setMasterCoupons(response.map(element => { return { ...element, onPress: handleCouponSelect } }));

        setLoading(false)
      } catch (error) {
        NotificationsFlash.SpillCoffee();
      }
    })()

  }, [])

  function handleCouponSelect(isSelected: boolean, masteCouponId: string, establishmentId: string) {
    isSelected
      ? setSelectedMaster([...selectedMasters, { masterCouponId: masteCouponId, establishmentId: establishmentId }])
      : setSelectedMaster(selectedMasters.filter(item => item.masterCouponId !== masteCouponId));
  }

  function CouponsBagTab(): JSX.Element {

    return (
      <BagTab show={selectedMasters.length > 0} onPress={() => setModalLinkShow(true)}>
        <ContainerItems>
          <ItemsSubtitle>Definir meu cupom</ItemsSubtitle>
          <CouponWrapper>
            <CouponIcon width={15} height={15} fill={colors.COLOR_WHITE} style={{ marginRight: 5 }} />
            <Items>{selectedMasters.length}</Items>
          </CouponWrapper>
        </ContainerItems>
      </BagTab>
    )
  }

  function onCloseLinkModal(cancel?: boolean) {
    if (!cancel)
      navigation.goBack()

    setModalLinkShow(false);
  }

  function LoadingOrEmptyRender() {
    return (
      <>
        {loading && <SpinnerLoading />}
        {!loading &&
          <ContainerNotFound>
            <NotFoundRestaurants height={160} />
            <EmptyTitle>Eita</EmptyTitle>
            <EmptySubtitle>Nenhum estabelecimento liberou cupom ainda</EmptySubtitle>
          </ContainerNotFound>
        }
      </>
    )
  }


  return (
    <Wrapper>
      <FlatList
        data={masterCoupons}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.master_coupon_id}
        ListHeaderComponent={() => <Header>Disponíveis</Header>}
        ListEmptyComponent={LoadingOrEmptyRender}
        renderItem={({ item }) => <CardMasterCoupons data={item} />}
      />
      {modalLinkShow && <LinkCouponModal masterCoupons={selectedMasters} visible={modalLinkShow} onClose={onCloseLinkModal} />}
      <CouponsBagTab />
    </Wrapper >
  );
}


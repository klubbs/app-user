import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import colors from '../../../../assets/constants/colors';
import { CouponIcon } from '../../../../assets/icons/coupon_icon';
import { InfluencerService } from '../../../services/influencerService';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { BagTab } from '../../component/bagTab';
import { CardMasterCoupons } from '../../componentHeavy/cardMasterCoupons';
import { ICardMasterCouponsProps } from '../../componentHeavy/cardMasterCoupons/@types';
import { ModalInfluencerCouponLink } from '../../modals/modalInfluencerCouponLink';

import { Wrapper, Header, ContainerItems, Items, CouponWrapper, ItemsSubtitle } from './styles';

export const useModalState = (initialState: boolean) => {
  const [modalVisible, setModalVisible] = useState(initialState);
  const [forceModalVisible, setForceModalVisible] = useState(false);

  const setModal = (modalState: boolean) => {
    // tyring to open "already open" modal
    if (modalState && modalVisible) {
      setForceModalVisible(true);
    }
    setModalVisible(modalState);
  };

  useEffect(() => {
    if (forceModalVisible && modalVisible) {
      setModalVisible(false);
    }
    if (forceModalVisible && !modalVisible) {
      setForceModalVisible(false);
      setModalVisible(true);
    }
  }, [forceModalVisible, modalVisible]);

  return [modalVisible, setModal];
};

export const MasterCoupons: React.FC = () => {

  const [masterCoupons, setMasterCoupons] = useState<ICardMasterCouponsProps[]>([])

  const [selectedMasters, setSelectedMaster] = useState<{ masterCouponId: string, establishmentId: string }[]>([])

  const [modalLinkShow, setModalLinkShow] = useState(false)


  useEffect(() => {

    (async function getMasterCoupons() {

      try {
        var response = await InfluencerService.getAllMasterCoupons();

        setMasterCoupons(response.map(element => { return { ...element, onPress: handleCouponSelect } }));

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

  function BagTabCoupons(): JSX.Element {

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


  return (
    <Wrapper>
      <FlatList
        data={masterCoupons}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => <Header>Disponíveis</Header>}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.master_coupon_id}
        renderItem={({ item }) => <CardMasterCoupons data={item} />}
      />
      {modalLinkShow && <ModalInfluencerCouponLink masterCoupons={selectedMasters} visible={modalLinkShow} onClose={() => setModalLinkShow(false)} />}
      <BagTabCoupons />
    </Wrapper >
  );
}


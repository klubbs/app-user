import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import colors from '../../../../assets/constants/colors';
import { CouponIcon } from '../../../../assets/icons/coupon_icon';
import { InfluencerService } from '../../../services/influencer_service';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { BagTab } from '../../component/bagTab';
import { CardMasterCoupons } from '../../componentHeavy/cardMasterCoupons';
import { ICardMasterCoupons } from '../../componentHeavy/cardMasterCoupons/@types';
import { ModalInfluencerLinkCoupons } from '../../componentHeavy/modalInfluencerLinkCoupons';

import { Wrapper, FlatComponent, Header, ContainerItems, Items, CouponWrapper, ItemsSubtitle } from './styles';

export const MasterCoupons: React.FC = () => {

  const [masterCoupons, setMasterCoupons] = useState<ICardMasterCoupons[]>([])
  const [selectedMasters, setSelectedMaster] = useState<string[]>([])
  const [showLinkModal, setShowLinkModal] = useState(false)

  useEffect(() => {

    getMasterCoupons();

  }, [])

  async function getMasterCoupons() {
    try {
      var response = await InfluencerService.getAllMasterCoupons();

      var tmp: ICardMasterCoupons[] = response.map(item => {
        return {
          masterCouponId: item.master_coupon_id,
          validAt: item.master_coupon_valid_at,
          description: item.master_coupon_description,
          establishment: item.establishment_name,
          off: item.master_coupon_off,
          onPress: handleCouponSelect
        }
      })

      setMasterCoupons(tmp);

    } catch (error) {
      NotificationsFlash.SpillCoffee();
    }
  }

  function handleCouponSelect(isSelected: boolean, masteCouponId: string) {
    isSelected
      ? setSelectedMaster([...selectedMasters, masteCouponId])
      : setSelectedMaster(selectedMasters.filter(item => item !== masteCouponId));
  }

  function BagTabCoupons(): JSX.Element {

    return (
      <BagTab show={selectedMasters.length > 0} onPress={() => setShowLinkModal(true)}>
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
        keyExtractor={(item, index) => item.masterCouponId}
        renderItem={({ item }) => <CardMasterCoupons data={item} />}
      />
      <ModalInfluencerLinkCoupons visible={showLinkModal} onClose={() => setShowLinkModal(false)} />
      <BagTabCoupons />
    </Wrapper >
  );
}


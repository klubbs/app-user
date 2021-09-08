import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { InfluencerService } from '../../../services/influencer_service';
import { StoreService } from '../../../services/store_services';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { BagTab } from '../../component/bagTab';
import { CardMasterCoupons } from '../../componentHeavy/cardMasterCoupons';
import { ICardMasterCoupons } from '../../componentHeavy/cardMasterCoupons/@types';

import { Wrapper, FlatComponent, Header, HeaderContainer } from './styles';

export const MasterCoupons: React.FC = () => {

  const [masterCoupons, setMasterCoupons] = useState<ICardMasterCoupons[]>([])

  const [selectedMasters, setSelectedMaster] = useState<string[]>([])

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
    console.log(masteCouponId)
    if (isSelected) {
      setSelectedMaster([...selectedMasters, masteCouponId])
      return
    }

    let tmp = selectedMasters.filter(item => item !== masteCouponId);

    setSelectedMaster(tmp);
  }


  return (
    <Wrapper>
      <FlatList
        data={masterCoupons}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => <Header>Disponíveis</Header>}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CardMasterCoupons data={item} />}
      />

      {selectedMasters.length > 0 && <BagTab />}
    </Wrapper>
  );
}


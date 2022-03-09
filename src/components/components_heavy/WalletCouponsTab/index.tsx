import React, { ReactElement, useState, useEffect } from 'react';
import { CouponService } from '../../../services/couponService';
import { ICouponsItem } from './@types';
import { Container, FlatComponent, NothingCouponsSubtitle } from './styles';
import { useNavigation } from '@react-navigation/native';
import { Coupon } from '../../components/Coupon'
import { format4TwoColumns } from '../../../utils/formatersUtils';

const NUM_COLUMNS = 2

export const CouponsWalletTab: React.FC = () => {

  const navigation = useNavigation()

  const [refresh, setRefresh] = useState(false)
  const [walletCoupom, setWalletCoupon] = useState<ICouponsItem[]>([])

  useEffect(() => {
    setTimeout(() => { getAllWalletCoupons() }, 2000)
  }, [])

  async function getAllWalletCoupons() {
    setRefresh(true)

    try {
      const response = await CouponService.getWalletCoupons();

      const mapped: ICouponsItem[] = []

      response.forEach(item => {
        mapped.push({
          ...item,
          influencer_image: '',//TODO
          empty: false
        })
      });

      setWalletCoupon(mapped)

    } catch (error) { }

    setRefresh(false)
  }

  function RenderCoupon(item: ICouponsItem): ReactElement {

    return (
      <>
        {item.empty && <Container empty={item.empty} />}

        {
          !item.empty &&
          <Coupon data={item} onPress={() => navigation.navigate('CouponQr', item)} />
        }
      </>
    )
  }

  return (
    <FlatComponent
      onRefresh={() => getAllWalletCoupons()}
      refreshing={refresh}
      data={format4TwoColumns<ICouponsItem>(walletCoupom, 2)}
      numColumns={NUM_COLUMNS}
      keyExtractor={(item, index) => { return `${item?.wallet_id}` }}
      ListEmptyComponent={() => <NothingCouponsSubtitle>Nenhum cupom adicionado ainda</NothingCouponsSubtitle>}
      renderItem={({ item }) => RenderCoupon(item as ICouponsItem)}
    />
  );
}

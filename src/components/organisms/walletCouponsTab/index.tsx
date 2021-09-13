import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { CouponService } from '../../../services/couponService';
import { ICouponsItem } from './@types';
import { Container, FlatComponent } from './styles';
import { useNavigation } from '@react-navigation/native';
import { Coupon } from '../../components/coupon'
import { format4TwoColumns } from '../../../utils/formatersUtils';

const NUM_COLUMNS = 2

export const CouponsWalletTab: React.FC = () => {

  const navigation = useNavigation()

  const [refresh, setRefresh] = useState(false)
  const [walletCoupom, setWalletCoupon] = useState<ICouponsItem[]>([])

  useEffect(() => {

    getAllWalletCoupons()

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

        {!item.empty &&
          <Coupon
            data={item}
            onPress={() => navigation.navigate('CouponQr', {
              wallet_id: item.wallet_id,
              coupon_code: item.coupon_code,
              coupon_id: item.coupon_id,
              master_coupons: item.master_coupons
            })}
          />
        }
      </>
    )
  }

  return (
    <FlatComponent
      onRefresh={() => getAllWalletCoupons()}
      refreshing={refresh}
      data={format4TwoColumns(walletCoupom, 2)}
      numColumns={NUM_COLUMNS}
      keyExtractor={(item: ICouponsItem, index: number) => item.wallet_id}
      renderItem={({ item }) => RenderCoupon(item as ICouponsItem)}
    />
  );
}
import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { CouponService } from '../../../services/coupon_service';
import { ICouponsItem } from './interfaces';
import { Container, FlatComponent } from './styles';
import { useNavigation } from '@react-navigation/native';
import { CouponWallet } from '../../component/coupon_wallet'

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

  function format4TwoColumns(data: ICouponsItem[]): ICouponsItem[] {

    const rowsNumber = Math.floor(data.length / NUM_COLUMNS)

    let numItemsLastRow = data.length - (rowsNumber * NUM_COLUMNS)

    while (numItemsLastRow !== NUM_COLUMNS && numItemsLastRow !== 0) {
      data.push({ wallet_id: `blank-${numItemsLastRow}`, empty: true, coupon_code: '', coupon_id: '', influencer_image: '', master_coupons: [] })

      numItemsLastRow++;
    }

    return data;
  }

  function RenderCoupon(item: ICouponsItem): ReactElement {

    return (
      <>
        {item.empty && <Container empty={item.empty} />}

        {!item.empty &&
          <CouponWallet data={item}
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
      data={format4TwoColumns(walletCoupom)}
      numColumns={NUM_COLUMNS}
      keyExtractor={(item: ICouponsItem) => item.wallet_id}
      renderItem={({ item }) => RenderCoupon(item as ICouponsItem)}
    />
  );
}

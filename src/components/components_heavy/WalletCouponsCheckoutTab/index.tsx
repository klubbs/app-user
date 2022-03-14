import React, { useEffect, useState } from 'react';
import { View } from 'react-native'
import { CouponService } from '../../../services/couponService';
import { CouponsCheckoutItems } from '../../components/CouponCheckout';
import { ICouponCheckoutItem } from '../../components/CouponCheckout/interface';
import { CheckoutsFlatList, NothingTransactionSubtitle, SpaceSkeleton, LineSkeleton, SquareSkeleton, WrapperSkeleton } from './styles';

export const CouponsCheckout: React.FC = () => {


  const [checkouts, setCheckouts] = useState<ICouponCheckoutItem[] | null>(null)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {

    (async function getCouponsCheckout() {
      try {

        const response = await CouponService.getCouponsCheckout();

        setCheckouts(response);

      } catch (error) { }
    })()


  }, [])

  async function onRefreshCheckouts() {
    setRefresh(true)

    try {

      const response = await CouponService.getCouponsCheckout();

      setCheckouts(response);

    } catch (error) { }

    setRefresh(false)
  }

  if (checkouts === null) {
    return (
      <WrapperSkeleton>
        <SquareSkeleton />
        <SpaceSkeleton />
        <View>
          <LineSkeleton top={true} />
          <SpaceSkeleton />
          <LineSkeleton />
        </View>
      </WrapperSkeleton>
    )
  }


  return (
    <CheckoutsFlatList
      data={checkouts}
      onRefresh={() => onRefreshCheckouts()}
      refreshing={refresh}
      keyExtractor={(item: ICouponCheckoutItem, index: number) => item.checkout_id}
      ListEmptyComponent={({ item }) => <NothingTransactionSubtitle>Nenhuma transação ainda</NothingTransactionSubtitle>}
      renderItem={({ item }) =>
        <CouponsCheckoutItems data={item} />
      }
    />
  );
}

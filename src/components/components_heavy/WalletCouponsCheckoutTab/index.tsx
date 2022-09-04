import React, { useEffect, useState } from 'react';
import { View } from 'react-native'
import { IUserCheckoutsReponse } from '../../../services/@types/@coupon-services';
import { CouponService } from '../../../services/coupon-service';
import { CardCheckoutOffer } from '../../components/card-checkout-offer';
import {
  CheckoutsFlatList,
  NothingTransactionSubtitle,
  SpaceSkeleton,
  LineSkeleton,
  SquareSkeleton,
  WrapperSkeleton
} from './styles';

export const CouponsCheckout: React.FC = () => {


  const [checkouts, setCheckouts] = useState<IUserCheckoutsReponse[] | null>(null)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    getCouponsCheckout()
  }, [])

  async function getCouponsCheckout() {
    try {

      const response = await CouponService.getCouponsCheckout();

      setCheckouts(response);

    } catch (error) { }
  }

  async function onRefreshCheckouts() {
    setRefresh(true)

    await getCouponsCheckout();

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
      refreshing={refresh}
      onRefresh={onRefreshCheckouts}
      keyExtractor={(item: IUserCheckoutsReponse, index: number) => item.checkout_id}
      ListEmptyComponent={({ item }: { item: IUserCheckoutsReponse }) => <NothingTransactionSubtitle>Nenhuma transação ainda</NothingTransactionSubtitle>}
      renderItem={({ item }: { item: IUserCheckoutsReponse }) =>
        <CardCheckoutOffer data={item} />
      }
    />
  );
}

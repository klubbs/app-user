import React, { useEffect, useState } from 'react';
import { Fade, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder';
import { CouponService } from '../../../services/coupon_service';
import { CouponsCheckoutItems } from '../../component/coupons_checkout_item';
import { ICouponCheckoutItem } from '../../component/coupons_checkout_item/interface';
import { CheckoutsFlatList, NothingTransactionSubtitle, PlaceHolderContent, PlaceHolderWrapper } from './styles';

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

  const onRefreshCheckouts = async () => {
    setRefresh(true)

    try {

      const response = await CouponService.getCouponsCheckout();

      setCheckouts(response);

    } catch (error) { }

    setRefresh(false)

  }


  if (checkouts === null) {
    return (
      <PlaceHolderWrapper
        Animation={Fade}
        Left={PlaceholderMedia}
      >
        <PlaceHolderContent />
        <PlaceholderLine />
      </PlaceHolderWrapper>
    )
  }


  return (
    <CheckoutsFlatList
      data={checkouts}
      onRefresh={() => onRefreshCheckouts()}
      refreshing={refresh}
      keyExtractor={item => `${item.checkout_id}`}
      ListEmptyComponent={({ item }) => <NothingTransactionSubtitle>Nenhuma transação ainda</NothingTransactionSubtitle>}
      renderItem={({ item }) =>
        <CouponsCheckoutItems data={item} />
      }
    />
  );
}

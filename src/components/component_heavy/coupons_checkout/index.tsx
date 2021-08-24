import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import colors from '../../../../assets/constants/colors';
import { CouponService } from '../../../services/coupon_service';
import { CouponsCheckoutItems } from '../../component/coupons_checkout_item';
import { ICouponCheckoutItem } from '../../component/coupons_checkout_item/interface';

export const CouponsCheckout: React.FC = () => {


  const [checkouts, setCheckouts] = useState<ICouponCheckoutItem[]>([])

  useEffect(() => {

    (async function getCouponsCheckout() {
      const response = await CouponService.getCouponsCheckout();

      setCheckouts(response);
    })()


  }, [])

  return (
    <FlatList
      data={checkouts}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: colors.COLOR_WHITE }}
      keyExtractor={item => `${item.checkout_id}`}
      renderItem={({ item }) =>
        <CouponsCheckoutItems
          checkout_id={item.checkout_id}
          created_at={item.created_at}
          establishment_name={item.establishment_name}
          image={item.image}
          off={item.off}
        />
      }
    />

  );
}

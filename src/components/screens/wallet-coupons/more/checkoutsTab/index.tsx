import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  IUserCheckoutsReponse,
  IWalletCouponsReponse,
} from '../../../../../services/@types/@coupon-services';
import { CouponService } from '../../../../../services/coupon-service';
import { MemoiZedCardCheckout } from '../../../../components/card-checkout-offer';
import { CheckoutsFlatList, NothingTransactionSubtitle } from './styles';
import { CheckoutContext } from '../../../../../contexts/checkout-context';
import { NotificationsFlash } from '../../../../../utils/flash-notifications';
import * as Haptic from 'expo-haptics';
import { formatUserCouponCode } from '../../../../../utils/formatersUtils';

export const CheckoutsTab: React.FC = () => {
  const navigation = useNavigation();

  const { setCheckoutStatus } = useContext(CheckoutContext);

  const [checkouts, setCheckouts] = useState<IUserCheckoutsReponse[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => refreshCheckouts());

    return unsubscribe;
  }, [navigation]);

  async function refreshCheckouts() {
    try {
      setRefresh(true);

      const response = await CouponService.getCouponsCheckout();

      setCheckouts(
        response.map((i) => {
          return {
            ...i,
            coupon_code: formatUserCouponCode(i.coupon_code),
          };
        }) ?? [],
      );
    } finally {
      setRefresh(false);
    }
  }

  function handleCardCheckoutPress(data: IUserCheckoutsReponse) {
    if (data.checkouted_at) {
      Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light);
      NotificationsFlash.customMessage('Checkout já finalizado', '', 'SUCCESS');

      return;
    }

    setCheckoutStatus({ checkoutId: data.checkout_id, isCheckinStatus: !data.checkouted_at });

    navigation.navigate('CouponQr', {
      wallet_id: '##NULL##',
      coupon_code: data.coupon_code,
      coupon_id: data.coupon_id,
      partner_image: '', //TODO: Adicionar image do influencer
      offers: [],
    } as IWalletCouponsReponse);
  }

  return (
    <CheckoutsFlatList
      data={checkouts}
      refreshing={refresh}
      onRefresh={refreshCheckouts}
      keyExtractor={(item: IUserCheckoutsReponse, index: number) => item.checkout_id}
      ListEmptyComponent={(_) => (
        <NothingTransactionSubtitle>Nenhuma transação ainda</NothingTransactionSubtitle>
      )}
      renderItem={({ item }: { item: IUserCheckoutsReponse }) => (
        <MemoiZedCardCheckout
          data={item}
          withSelector={false}
          onPress={() => {
            handleCardCheckoutPress(item);
          }}
        />
      )}
    />
  );
};

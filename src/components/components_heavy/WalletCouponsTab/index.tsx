import React, { ReactElement, useState, useEffect } from 'react';
import { CouponService } from '../../../services/coupon-service';
import { Container, FlatComponent, NothingCouponsSubtitle } from './styles';
import { useNavigation } from '@react-navigation/native';
import { Coupon } from '../../components/Coupon';
import { format4TwoColumns, formatUserCouponCode } from '../../../utils/formatersUtils';
import { IWalletCouponsReponse } from '../../../services/@types/@coupon-services';

const NUM_COLUMNS = 2;

export const CouponsWalletTab: React.FC = () => {
  const navigation = useNavigation();

  const [refresh, setRefresh] = useState(false);
  const [walletCoupom, setWalletCoupon] = useState<(IWalletCouponsReponse & { empty: boolean })[]>(
    [],
  );

  useEffect(() => {
    handleGetWalletCoupons();
  }, []);

  async function handleGetWalletCoupons() {
    try {
      setRefresh(true);

      const couponsResponse = await CouponService.getWalletCoupons();

      const mapped = couponsResponse.map((item) => {
        return { ...item, empty: false } as IWalletCouponsReponse & { empty: boolean };
      });

      setWalletCoupon(mapped);
    } finally {
      setRefresh(false);
    }
  }

  function RenderCoupon(item: IWalletCouponsReponse & { empty: boolean }): ReactElement {
    if (item.empty) {
      return <Container empty={item.empty} />;
    }

    const transformedContract = {
      ...item,
      coupon_code: formatUserCouponCode(item.coupon_code),
    };

    return (
      <Coupon
        data={transformedContract}
        onPress={() => navigation.navigate('CouponQr', transformedContract)}
      />
    );
  }

  return (
    <FlatComponent
      onRefresh={handleGetWalletCoupons}
      refreshing={refresh}
      data={format4TwoColumns<IWalletCouponsReponse & { empty: boolean }>(walletCoupom, 2)}
      numColumns={NUM_COLUMNS}
      keyExtractor={({ item, _ }: any) => {
        return `${item?.wallet_id}`;
      }}
      ListEmptyComponent={() => (
        <NothingCouponsSubtitle>Nenhum cupom adicionado ainda</NothingCouponsSubtitle>
      )}
      renderItem={({ item }: { item: IWalletCouponsReponse & { empty: boolean } }) =>
        RenderCoupon(item)
      }
    />
  );
};

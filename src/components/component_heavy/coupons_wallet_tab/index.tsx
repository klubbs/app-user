import React, { ReactElement, useState, useEffect } from 'react';
import { CouponService } from '../../../services/coupon_service';
import { ICouponsItem } from './interfaces';
import { Container, CouponImage, FlatComponent, Off, Valid } from './styles';
import { useNavigation } from '@react-navigation/native';
import { CouponWallet } from '../../component/coupon_wallet'
const NUM_COLUMNS = 2

export const CouponsWalletTab: React.FC = () => {

  const navigation = useNavigation()

  const [walletCoupom, setWalletCoupon] = useState<ICouponsItem[]>([])

  useEffect(() => {

    const getAllWalletCoupons = async () => {

      try {
        const response = await CouponService.getWalletCoupons();

        const mapped: ICouponsItem[] = []

        response.forEach(item => {
          mapped.push({
            ...item,
            empty: false
          })
        });

        setWalletCoupon(mapped)

      } catch (error) { }
    }

    getAllWalletCoupons()

  }, [])


  const formatColumnsData = (data: ICouponsItem[]): ICouponsItem[] => {

    const rowsNumber = Math.floor(data.length / NUM_COLUMNS)

    let numItemsLastRow = data.length - (rowsNumber * NUM_COLUMNS)

    while (numItemsLastRow !== NUM_COLUMNS && numItemsLastRow !== 0) {
      data.push({ wallet_id: `blank-${numItemsLastRow}`, empty: true, coupon_code: '', coupon_id: '', master_coupons: [] })

      numItemsLastRow++;
    }

    return data;
  }

  const RenderItem = (item: ICouponsItem): ReactElement => {

    return (
      <>
        {item.empty && <Container empty={item.empty} />}

        {!item.empty &&
          <CouponWallet data={item} />
          // <Container empty={item.empty} onPress={() => navigation.navigate('CouponQr', {
          //   recommendation_coupon_code: item.recommendation_coupon_code,
          //   coupon_off_percentual: item.coupon_off_percentual,
          //   coupon_description: item.coupon_description,
          //   coupon_valid_at: item.coupon_valid_at,
          //   establishment_name: item.establishment_name,
          //   establishment_image: item.establishment_image
          // })}>
          //   <CouponImage source={{ uri: item.establishment_image }} />
          //   <Off>{item.coupon_off_percentual}% OFF</Off>
          //   <Valid>Válido até {
          //     item.coupon_valid_at?.ToDateFormat()
          //       .toLocaleTimeString("pt-br",
          //         {
          //           formatMatcher: "best fit",
          //           day: 'numeric',
          //           month: 'numeric',
          //           hour: '2-digit',
          //           minute: '2-digit'
          //         })}
          //   </Valid>
          // </Container>
        }
      </>
    )
  }

  return (
    <FlatComponent
      data={formatColumnsData(walletCoupom)}
      numColumns={NUM_COLUMNS}
      keyExtractor={(item: ICouponsItem) => item.wallet_id}
      renderItem={({ item }) => RenderItem(item as ICouponsItem)}
    />
  );
}

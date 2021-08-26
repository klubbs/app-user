import React, { ReactElement, useState, useEffect } from 'react';
import { CouponService } from '../../../services/coupon_service';
import { ICouponsItem } from './interfaces';
import { Container, CouponImage, FlatComponent, Off, Valid } from './styles';
import { useNavigation } from '@react-navigation/native';

const NUM_COLUMNS = 2

export const CouponsStorageTab: React.FC = () => {

  const navigation = useNavigation()

  const [walletCoupom, setWalletCoupon] = useState<ICouponsItem[]>([])

  useEffect(() => {

    const getAllWalletCoupons = async () => {

      try {
        const response = await CouponService.getWalletCoupons();

        const mapped: ICouponsItem[] = []

        response.forEach(item => {
          mapped.push({
            coupon_description: item.coupon_description,
            coupon_off_percentual: item.coupon_off_percentual,
            coupon_valid_at: item.coupon_valid_at,
            establishment_image: item.establishment_image,
            establishment_name: item.establishment_name,
            recommendation_coupon_code: item.recommendation_coupon_code,
            wallet_id: item.wallet_id,
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
      data.push({ wallet_id: `blank-${numItemsLastRow}`, empty: true, coupon_description: '', coupon_off_percentual: 0, coupon_valid_at: 0, establishment_image: '', establishment_name: '', recommendation_coupon_code: '' })

      numItemsLastRow++;
    }

    return data;
  }

  const RenderItem = (item: ICouponsItem): ReactElement => {

    return (
      <>
        {item.empty && <Container empty={item.empty} />}

        {!item.empty &&
          <Container empty={item.empty} onPress={() => navigation.navigate('CouponQr', { recommendation_code: item.recommendation_coupon_code, establishment_name: item.establishment_name, coupon_off: item.coupon_off_percentual })}>
            <CouponImage source={{ uri: item.establishment_image }} />
            <Off>{item.coupon_off_percentual}% OFF</Off>
            <Valid>Válido até {
              item.coupon_valid_at?.ToDateFormat()
                .toLocaleTimeString("pt-br",
                  {
                    formatMatcher: "best fit",
                    day: 'numeric',
                    month: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
            </Valid>
          </Container>
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

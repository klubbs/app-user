import React, { useRef, useEffect, ReactElement } from 'react';
import { Modal, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import colors from '../../../../assets/constants/colors';
import { InfoIcon } from '../../../../assets/icons/info_icon';
import { CouponWallet } from '../../component/couponWallet';
import { Feather } from '@expo/vector-icons';

import { Wrapper, Header, BottomTab, Empty } from './styles';
import Button from '../../component/button';
import { format4TwoColumns } from '../../../utils/formatersUtils';
import { ICouponsItem } from '../walletCouponsTab/interfaces';

const NUM_COLUMNS = 2
export const ModalInfluencerLinkCoupons: React.FC<{ visible: boolean, onClose: () => void }> = (props) => {

  const modalizeRef = useRef<Modalize>()

  useEffect(() => {

    if (props.visible)
      modalizeRef.current?.open()

  }, [props.visible])


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
        {item.empty && <Empty />}

        {!item.empty &&
          <CouponWallet
            data={item}
            onPress={() => { }}
          />
        }
      </>
    )
  }

  return (
    // <Modalize
    //   ref={modalizeRef}
    //   modalHeight={800}
    //   onClose={props.onClose}
    // >
    <Modal
      animationType={'slide'}
      presentationStyle={'formSheet'}
      onRequestClose={props.onClose}
      visible={props.visible}
    >
      <Wrapper>
        {/* <Feather name={'chevron-down'} size={20} color={colors.COLOR_BLACK40} /> */}

        <Header>Selecione seu cupom</Header>
        <FlatList
          data={format4TwoColumns([{ master_coupons: [] }, { master_coupons: [] }, { master_coupons: [] }])}
          numColumns={2}
          style={{ marginTop: '20%' }}
          contentContainerStyle={{ width: '100%' }}
          renderItem={({ item }) => RenderCoupon(item as ICouponsItem)}
        />

        <BottomTab>

        </BottomTab>

      </Wrapper>
    </Modal >
    // </Modalize>
  );
}

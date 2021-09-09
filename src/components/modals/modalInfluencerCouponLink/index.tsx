import React, { useRef, useEffect, ReactElement, useState } from 'react';
import { Modal, View } from 'react-native';
import { Coupon } from '../../component/coupon';
import { format4TwoColumns } from '../../../utils/formatersUtils'
import { Wrapper, Header, BottomTab, Empty, Container, SelectorCoupon, ConfirmButton, FlatItems } from './styles';
import { IInfluencerLinkCoupon, IModalInfluencerLinkCoupons } from './@types';
import { InfluencerService } from '../../../services/influencerService';
import { ISelectorRefs } from '../../component/selector/@types';


export const ModalInfluencerCouponLink: React.FC<IModalInfluencerLinkCoupons> = (props) => {

  const [coupons, setCoupons] = useState<IInfluencerLinkCoupon[]>([])
  const [selectedCoupon, setSelectedCoupon] = useState('')

  useEffect(() => {

    (async function getAllInfluencerCoupons() {
      try {
        const response = await InfluencerService.getAllCouponsByInfluencer()

        setCoupons(response)

      } catch (error) { }
    })()

  }, [])

  function RenderCoupon({ item, index }: { item: IInfluencerLinkCoupon, index: number }): ReactElement {

    const isToggleSelected = selectedCoupon === item.coupon_id;

    const contract = {
      coupon_id: item.coupon_id,
      coupon_code: item.coupon_code,
      influencer_image: '',//TODO
      master_coupons: item.master_coupons
    }

    return (
      <>
        {item?.empty && <Empty />}

        {
          !item?.empty &&
          <Container>
            <SelectorCoupon onPress={() => setSelectedCoupon(item.coupon_id)} toggle={isToggleSelected} />
            <Coupon
              toggle={true}
              isActiveByToggle={isToggleSelected}
              data={contract}
              onPress={() => { }}
            />
          </Container>
        }
      </>
    )
  }


  return (
    <Modal
      animationType={'slide'}
      presentationStyle={'formSheet'}
      onRequestClose={props.onClose}
      visible={props.visible}
    >
      <Wrapper>
        <Header>Selecione seu cupom</Header>
        <FlatItems
          data={format4TwoColumns(coupons, 2)}
          renderItem={({ item, index }) => RenderCoupon({ item: item as IInfluencerLinkCoupon, index: index })}
        />

        <BottomTab>
          <ConfirmButton onPress={() => { }} />
        </BottomTab>

      </Wrapper>
    </Modal >
  );
}


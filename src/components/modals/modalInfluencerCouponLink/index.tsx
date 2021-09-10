import React, { useEffect, ReactElement, useState } from 'react';
import { Modal, View } from 'react-native';
import { Coupon } from '../../component/coupon';
import { format4TwoColumns } from '../../../utils/formatersUtils'
import { Wrapper, Header, BottomTab, Empty, Container, SelectorCoupon, ConfirmButton, FlatItems, HeaderDisabled, SubtitleDisabled } from './styles';
import { ICouponInfluencer, IModalInfluencerCouponLinkProps } from './@types';
import { InfluencerService, InfluencerServiceException } from '../../../services/influencerService';
import { Spinner } from '../../component/spinner';
import { IError } from '../../../settings/@types/IResponses';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


export const ModalInfluencerCouponLink: React.FC<IModalInfluencerCouponLinkProps> = (props) => {

  const [coupons, setCoupons] = useState<ICouponInfluencer[]>([])
  const [selectedCoupon, setSelectedCoupon] = useState('')
  const [disableSave, setDisableSave] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    (async function getAllInfluencerCoupons() {
      try {
        const response = await InfluencerService.getAllCouponsByInfluencer()

        setCoupons(response)

      } catch (error) { NotificationsFlash.SpillCoffee() }
    })()

  }, [])


  async function handleCouponLink() {

    if (props.masterCoupons?.length <= 0) {
      return
    }

    try {

      setLoading(true)

      await InfluencerService.linkCouponInMasterCoupon(props.masterCoupons.map(i => i.masterCouponId), selectedCoupon);

      props.onClose();

    } catch (error) {
      InfluencerServiceException.catchLinkCoupon(error as IError)
    } finally {
      setLoading(false)
    }
  }

  function handleSelectCoupon(coupon: ICouponInfluencer) {

    setSelectedCoupon(coupon.coupon_id)
    setDisableSave(false)

    coupon.master_coupons.forEach(element => {

      props.masterCoupons.forEach(subElement => {

        if (element.establishment_id === subElement.establishmentId) {
          setDisableSave(true)
          return;
        }

      })

    });


  }

  function RenderCoupon({ item, index }: { item: ICouponInfluencer, index: number }): ReactElement {

    const isToggleSelected = selectedCoupon === item.coupon_id;

    return (
      <>
        {item?.empty && <Empty />}
        {
          !item?.empty &&
          <Container>
            <SelectorCoupon toggle={isToggleSelected} onPress={() => handleSelectCoupon(item)} />
            <Coupon
              data={
                {
                  coupon_id: item.coupon_id,
                  coupon_code: item.coupon_code,
                  influencer_image: '', //TODO Adicionar imagem do influencer aqui
                  master_coupons: item.master_coupons
                }
              }
              toggle={true}
              isActiveByToggle={isToggleSelected}
              onPress={() => handleSelectCoupon(item)}

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
      onRequestClose={() => props.onClose}
      visible={props.visible}
    >
      <Wrapper>
        <Header>Selecione seu cupom</Header>
        <FlatItems
          data={format4TwoColumns(coupons, 2)}
          keyExtractor={(item: any, index: number) => item.coupon_id}
          renderItem={({ item, index }) => RenderCoupon({ item: item as ICouponInfluencer, index: index })}
        />

        <BottomTab disabled={disableSave}>

          {disableSave && <HeaderDisabled>Cupom não permitido para adicionar</HeaderDisabled>}
          {disableSave && <SubtitleDisabled>Cada cupom seu só pode armazenar ao menos um cupom de cada restaurante</SubtitleDisabled>}

          {!disableSave && selectedCoupon !== '' && <ConfirmButton onPress={handleCouponLink} />}
        </BottomTab>

      </Wrapper>
      <Spinner loading={loading} />
    </Modal >
  );
}


import React, { useEffect, ReactElement, useState, useImperativeHandle } from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { Coupon } from '../../components/Coupon';
import { format4TwoColumns } from '../../../utils/formatersUtils'
import { ICouponInfluencer, ILinkCouponOffersProps, ILinkCouponOffersRef } from './@types';
import { InfluencerService, InfluencerServiceException } from '../../../services/influencerService';
import { Spinner } from '../../components/Spinner';
import { IError } from '../../../settings/@types/IResponses';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { useNavigation } from '@react-navigation/native';
import {
  Wrapper,
  Header,
  BottomTab,
  Empty,
  Container,
  SelectorCoupon,
  ConfirmButton,
  FlatItems,
  HeaderDisabled,
  SubtitleDisabled,
  Cancel,
  HeaderContainer
} from './styles';


export const LinkCouponOffers = React.forwardRef<ILinkCouponOffersRef, ILinkCouponOffersProps>((props, ref) => {

  const navigation = useNavigation();

  const [visible, setVisible] = useState(false)
  const [coupons, setCoupons] = useState<ICouponInfluencer[]>([])
  const [selectedCoupon, setSelectedCoupon] = useState('')
  const [disableSave, setDisableSave] = useState(false)
  const [loading, setLoading] = useState(false)

  useImperativeHandle(ref, () => ({ showModal: () => setVisible(true) }));

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

      await InfluencerService.linkCouponInOffers(props.masterCoupons.map(i => i.masterCouponId), selectedCoupon);

      NotificationsFlash.CustomMessage('Adicionado', 'Oferta dos estabelecimentos adicionado ao cupom', 'SUCCESS')

      setVisible(false)

      navigation.goBack()

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
              toggle={true}
              isActiveByToggle={isToggleSelected}
              onPress={() => handleSelectCoupon(item)}
              data={
                {
                  coupon_id: item.coupon_id,
                  coupon_code: item.coupon_code,
                  influencer_image: '', //TODO Adicionar imagem do influencer aqui
                  master_coupons: item.master_coupons
                }
              }
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
      visible={visible}
    >
      <Wrapper>
        <HeaderContainer>
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <Cancel>Cancelar</Cancel>
          </TouchableWithoutFeedback>
          <Header>Selecione seu cupom</Header>
        </HeaderContainer>
        <FlatItems
          data={format4TwoColumns(coupons, 2)}
          keyExtractor={(item: any, index: number) => item.coupon_id}
          renderItem={({ item, index }) => RenderCoupon({ item: item as ICouponInfluencer, index: index })}
        />

        <BottomTab disabled={disableSave}>

          {disableSave && <HeaderDisabled>Indisponível para associar</HeaderDisabled>}
          {disableSave && <SubtitleDisabled>Cada cupom só pode ser associado a uma oferta por estabelecimento</SubtitleDisabled>}

          {!disableSave && selectedCoupon !== '' && <ConfirmButton onPress={handleCouponLink} />}
        </BottomTab>

      </Wrapper>
      <Spinner loading={loading} />
    </Modal >
  );
})


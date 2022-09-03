import React, { useState, useImperativeHandle } from 'react';
import { Keyboard } from 'react-native'
import { ModalComponent } from '../../components/Modal';
import { Input, Container, Wrapper } from './styles';
import { ButtonStorage } from '../../components/ButtonStorage';
import { CouponService } from '../../../services/coupon-service';
import { Spinner } from '../../components/spinner';
import { NotificationsFlash } from '../../../utils/flash-notifications';
import { IError } from '../../../settings/@types/@responses';
import { InfluencerService, InfluencerServiceException } from '../../../services/influencer-service';
import { IModalAddCouponProps, IModalAddCouponRef } from './@types';
import { SubtitleSaveCouponImage } from '../../../../assets/images/coupons/contributeInfluencer';

export const ModalAddCoupon = React.forwardRef<IModalAddCouponRef, IModalAddCouponProps>((props, ref) => {

  const [visibleModal, setVisibleModal] = useState(false);
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)

  useImperativeHandle(ref, () => ({ hide: () => setVisibleModal(false), show: () => setVisibleModal(true) }));

  async function onSaveCoupon() {
    try {
      setLoading(true)

      Keyboard.dismiss();

      if (value.trim().length < 5) {
        NotificationsFlash.customMessage('', '🚫 Cupom Inválido.', 'DANGER')
        return;
      }

      await CouponService.saveCouponInWallet(value)

      NotificationsFlash.customMessage('Você já pode economizar', 'Adicionamos o cupom a sua carteira', 'SUCCESS')

      onCloseHandler()

    } catch (error) {
      CouponService.catchSaveCouponInWallet(error as IError)
    } finally {
      setLoading(false)
    }
  }

  async function onCreateNewCoupon() {

    try {

      Keyboard.dismiss();

      if (value.trim().length < 5) {
        NotificationsFlash.customMessage('Cupom inválido', 'Seu cupom precisa ter 5 ou mais caracteres', 'NEUTRAL')
        return;
      }

      setLoading(true)

      await InfluencerService.createNewCouponCode(value)

      NotificationsFlash.customMessage('Cupom criado', 'Só divulgar para seus seguidores', 'SUCCESS')

      onCloseHandler();
    } catch (error) {

      InfluencerServiceException.catchCreateNewCoupon(error as IError)

    } finally {
      setLoading(false)
    }
  }

  function onCloseHandler() {
    setValue('')
    setVisibleModal(false)
  }

  return (

    <ModalComponent visible={visibleModal} onClose={onCloseHandler}>
      <Spinner loading={loading} />
      <Wrapper>
        <Container>
          <Input
            autoCorrect={false}
            value={value}
            onChangeText={(e: string) => setValue(e.toUpperCase().trim())}
          />
          <ButtonStorage onPress={() => props.isInfluencer ? onCreateNewCoupon() : onSaveCoupon()} size={25} />
        </Container>
        <Container>

          <SubtitleSaveCouponImage />
        </Container>

      </Wrapper>
    </ModalComponent >
  );
})

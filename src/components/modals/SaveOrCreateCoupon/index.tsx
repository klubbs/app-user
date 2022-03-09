import React, { useState, useImperativeHandle } from 'react';
import { Keyboard } from 'react-native'
import { ModalComponent } from '../../components/Modal';
import { Input, Container, Wrapper } from './styles';
import { ButtonStorage } from '../../components/ButtonStorage';
import { CouponService } from '../../../services/couponService';
import { Spinner } from '../../components/Spinner';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { IError } from '../../../settings/@types/IResponses';
import { InfluencerService, InfluencerServiceException } from '../../../services/influencerService';
import { ISaveOrCreateCouponProps, ISaveOrCreateCouponRef } from './@types';
import { SubtitleSaveCouponImage } from '../../../../assets/images/coupons/contributeInfluencer';

export const SaveOrCreateCoupon = React.forwardRef<ISaveOrCreateCouponRef, ISaveOrCreateCouponProps>((props, ref) => {

  const [visibleModal, setVisibleModal] = useState(false);
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)

  useImperativeHandle(ref, () => ({ hide: () => setVisibleModal(false), show: () => setVisibleModal(true) }));

  async function onSaveCoupon() {
    try {
      setLoading(true)

      Keyboard.dismiss();

      if (!CouponService.valid4SaveInWallet(value)) {
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

      if (value.trim().length < 10) {
        NotificationsFlash.customMessage('Cupom inválido', 'Seu cupom precisa ter 10 caracteres', 'NEUTRAL')
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
            onChangeText={(e) => setValue(e.toUpperCase().trim())}
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

import React, { useState } from 'react';
import { Keyboard } from 'react-native'
import { ModalComponent } from '../../components/modal';
import { Input, Container, Wrapper } from './styles';
import { ButtonStorage } from '../../components/buttonStorage';
import { CouponService } from '../../../services/couponService';
import { Spinner } from '../../components/spinner';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { SubtitleSaveCouponImage } from '../../../../assets/images/subtitle_save_coupon';
import { IError } from '../../../settings/@types/IResponses';
import { InfluencerService, InfluencerServiceException } from '../../../services/influencerService';

export const AddCouponModal: React.FC<{ visible: boolean, onClose: any, isInfluencer: boolean }> = (props) => {

  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)

  async function onSaveCoupon() {
    try {
      setLoading(true)

      Keyboard.dismiss();

      if (!CouponService.valid4SaveInWallet(value)) {
        NotificationsFlash.CustomMessage('', "🚫 Cupom Inválido.", 'DANGER')
        return;
      }

      await CouponService.saveCouponInWallet(value)

      NotificationsFlash.CustomMessage('Você já pode economizar', 'Adicionamos o cupom a sua carteira', 'SUCCESS')

      onCloseHandler()

    } catch (error) {
      CouponService.catchSaveCouponInWallet(error as IError)
    } finally {
      setLoading(false)
    }
  }

  async function onCreateNewCoupon() {

    try {

      if (value.length <= 0) {
        return;
      }

      setLoading(true)

      Keyboard.dismiss();

      await InfluencerService.createNewCouponCode(value)

      NotificationsFlash.CustomMessage('Cupom criado', 'Só divulgar para seus seguidores', 'SUCCESS')

      onCloseHandler();
    } catch (error) {

      InfluencerServiceException.catchCreateNewCoupon(error as IError)

    } finally {
      setLoading(false)
    }
  }

  function onCloseHandler() {
    setValue('')
    props.onClose();
  }

  return (

    <ModalComponent visible={props.visible} onClose={() => onCloseHandler()}>
      <Spinner loading={loading} />
      <Wrapper>
        <Container>
          <Input value={value} onChangeText={(e) => setValue(e.toUpperCase().trim())} />
          <ButtonStorage onPress={() => props.isInfluencer ? onCreateNewCoupon() : onSaveCoupon()} size={25} />
        </Container>

        <SubtitleSaveCouponImage />
      </Wrapper>
    </ModalComponent >
  );
}

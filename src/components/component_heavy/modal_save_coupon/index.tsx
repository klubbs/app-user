import React, { useState } from 'react';
import { Keyboard } from 'react-native'
import { ModalComponent } from '../../component/modal';
import { Input, Container, Wrapper } from './styles';
import { ButtonStorage } from '../../component/button_storage';
import { CouponService } from '../../../services/coupon_service';
import { Spinner } from '../../component/spinner';
import { NotificationsFlash } from '../../../utils/notificationsFlash_utils';
import { IError } from '../../../settings/services/api';
import { SubtitleSaveCouponImage } from '../../../../assets/images/subtitle_save_coupon';

export const ModalSaveCoupon: React.FC<{ visible: boolean, onClose: any }> = (props) => {

  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)

  const onSaveCoupon = async () => {
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

  const onCloseHandler = () => {
    setValue('')
    props.onClose();
  }

  return (

    <ModalComponent visible={props.visible} onClose={() => onCloseHandler()}>
      <Spinner loading={loading} />
      <Wrapper>
        <Container>
          <Input value={value} onChangeText={(e) => setValue(e.toUpperCase())} />
          <ButtonStorage onPress={() => onSaveCoupon()} size={25} />
        </Container>

        <SubtitleSaveCouponImage />
      </Wrapper>
    </ModalComponent >
  );
}

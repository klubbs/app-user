import React, { useState } from 'react';
import { View } from 'react-native';
import { ModalComponent } from '../../component/modal';
import { Cursor, RenderCellOptions, useClearByFocusCell } from 'react-native-confirmation-code-field';

import { Input, Container, Wrapper } from './styles';
import { ButtonBox } from '../../component/button_box';
import { CouponService } from '../../../services/coupon_service';

export const ModalSaveCoupon: React.FC<{ visible: boolean, onClose: any }> = (props) => {

  const [value, setValue] = useState("")


  const onSaveCoupon = async () => {
    try {

      await CouponService.saveCouponInWallet(value)

    } catch (error) {

    }
  }

  return (

    <ModalComponent visible={props.visible} onClose={() => props.onClose()}>
      <Wrapper>
        <Container>
          <Input value={value} onChangeText={(e) => setValue(e)} />
          <ButtonBox onPress={() => { }} size={25} />
        </Container>
      </Wrapper>
    </ModalComponent >
  );
}

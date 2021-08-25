import React, { useState } from 'react';
import { View } from 'react-native';
import { ModalComponent } from '../../component/modal';
import { Cursor, RenderCellOptions, useClearByFocusCell } from 'react-native-confirmation-code-field';

import { Input, Wrapper } from './styles';
import { ButtonCreateCoupon } from '../../component/button_cupon';
import { ButtonBox } from '../../component/button_box';

export const ModalSaveCoupon: React.FC<{ visible: boolean, onClose: any }> = (props) => {

  const [value, setValue] = useState("")


  return (

    <ModalComponent visible={props.visible} onClose={() => props.onClose()}>
      <Wrapper>
        <Input value={value} onChangeText={(e) => setValue(e)} />
        <ButtonBox onPress={() => { }} size={25} />
      </Wrapper>
    </ModalComponent >
  );
}

import { useNavigation } from '@react-navigation/native';
import React, { useImperativeHandle, useState } from 'react';
import { Keyboard } from 'react-native';
import { CodeField, Cursor, RenderCellOptions, useClearByFocusCell } from 'react-native-confirmation-code-field';
import Button from '../../component/button';
import ModalComponent from '../../component/modal';
import { Container, Input, Title, TitleDescription, TouchableReset } from './styles';
import { IModalCodeProps, IModalRef } from './types';

const CELL_COUNT = 5;

export const ModalCode = React.forwardRef<IModalRef, IModalCodeProps>((propsComp, ref) => {

  const [code, setCode] = useState("")
  const [visible, setVisible] = useState(false)

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: code, setValue: setCode });

  const navigation = useNavigation()

  useImperativeHandle(ref, () => ({ hideModal, openModal: () => setVisible(true) }));

  const renderInput = ({ index, symbol, isFocused }: RenderCellOptions) => {
    let textChild = null;

    if (symbol) {
      textChild = symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Input key={index} onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Input>
    );
  };

  const hideModal = () => {
    setVisible(false)
  }

  const handleConfirm = () => {

    Keyboard.dismiss()

    if (propsComp.action === 'REGISTER') {

      navigation.removeListener('beforeRemove', () => { })

      navigation.navigate('Tabs')
    }

  }

  const handleResetCode = () => {

  }

  return (
    <ModalComponent visible={visible} onClose={hideModal}>
      <Container>
        <Title>Verifique seu e-mail</Title>
        <TitleDescription>Digite o código que enviamos para: {propsComp.registerParams?.email ?? propsComp.recoverParams?.email}</TitleDescription>
      </Container>
      <Container>
        <CodeField
          value={code}
          onChangeText={(e) => setCode(e)}
          cellCount={CELL_COUNT}
          returnKeyType={'none'}
          keyboardType="default"
          textContentType="oneTimeCode"
          renderCell={renderInput}
          {...props}
        />
      </Container>
      <Container>
        <Button text={'Pronto'} onPress={handleConfirm} styleContainer={{ width: '60%' }} />
        <TouchableReset onPress={handleResetCode} >
          <TitleDescription>Reenviar código</TitleDescription>
        </TouchableReset>
      </Container>
    </ModalComponent>
  );
})

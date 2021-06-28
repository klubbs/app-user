import { useNavigation } from '@react-navigation/native';
import * as Haptic from 'expo-haptics';
import React, { useContext, useImperativeHandle, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { CodeField, Cursor, RenderCellOptions, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { AuthContext } from '../../../contexts/AuthContext';
import { RegisterUserExecutor } from '../../../executors/users/register_user_executor';
import { NotificationsFlash } from '../../../utils/notificationsFlash_utils';
import Button from '../../component/button';
import ModalComponent from '../../component/modal';
import { Spinner } from '../../component/spinner';
import { Container, Input, Title, TitleDescription, TouchableReset } from './styles';
import { IModalCodeProps, IModalRef } from './types';

const CELL_COUNT = 5;

export const ModalCode = React.forwardRef<IModalRef, IModalCodeProps>((propsComp, ref) => {

  const [code, setCode] = useState("")
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const { _register, _signIn } = useContext(AuthContext)

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: code, setValue: setCode });

  const navigation = useNavigation()

  useImperativeHandle(ref, () => ({ hideModal, openModal }));

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

  const openModal = () => {

    const user = propsComp.registerParams

    if (user) {
      setVisible(true)
    }
  }

  const hideModal = () => {
    Alert.alert('Sair', 'Ao sair, um novo código precisará ser enviado.', [
      {
        text: 'Não sair',
        style: 'cancel',
        onPress: () => { }
      },
      {
        text: 'Sim, quero sair.',
        style: 'destructive',
        onPress: () => setVisible(false)
      }
    ])
  }

  const handleConfirm = async () => {
    Keyboard.dismiss()

    propsComp.action === 'REGISTER' ? await createUser() : null
  }

  const createUser = async () => {

    try {
      setLoading(true)

      const user = propsComp.registerParams

      if (user) {
        await _register(user?.mail, user?.password, user?.name, user?.phone, code)

        await _signIn(user.mail, user.password);
      }

      navigation.removeListener('beforeRemove', () => { })

      navigation.navigate('Tabs')
    } catch (error: any) {

      if (error?.statusCode === 412) {
        NotificationsFlash.InvalidCode()
      }

      if (error?.statusCode === 422) {
        NotificationsFlash.SpillCoffee()
      }

    } finally {
      setLoading(false)
    }
  }

  const handleResetCode = () => {

    Alert.alert('Reenviar código ', 'Gostaria de enviar um novo código de autenticação ?', [
      {
        text: 'Não',
        style: 'cancel',
        onPress: () => { }
      },
      {
        text: 'Sim, enviar',
        style: 'destructive',
        onPress: async () => {
          try {
            setLoading(true)
            const user = propsComp.registerParams

            if (user) {
              await RegisterUserExecutor._sendRegisterCode(user?.mail)

              NotificationsFlash.SuccessfullySentCode()
            }

          } catch (error) {
            Haptic.notificationAsync(Haptic.NotificationFeedbackType.Warning)

            NotificationsFlash.SpillCoffee()
          } finally {
            setLoading(false)
          }
        }
      }
    ])

  }

  return (
    <>
      <ModalComponent visible={visible} onClose={hideModal}>
        <Spinner loading={loading} />
        <Container>
          <Title>Verifique seu e-mail</Title>
          <TitleDescription>Digite o código que enviamos para: {propsComp.registerParams?.mail ?? propsComp.recoverParams?.email}</TitleDescription>
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
    </>
  );
})

import { useNavigation } from '@react-navigation/native';
import * as Haptic from 'expo-haptics';
import React, { useContext, useImperativeHandle, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { Cursor, RenderCellOptions, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { AuthContext } from '../../../contexts/authContext';
import { LoginService } from '../../../services/loginService';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { ModalComponent } from '../../component/modal';
import { Spinner } from '../../component/spinner';
import { ButtonConfirm, CodeBoxes, Container, Input, Title, TitleDescription, TouchableReset } from './styles';
import { IModalCodeProps, IModalRef } from './@types';


export const ModalMailCode = React.forwardRef<IModalRef, IModalCodeProps>((propsComp, ref) => {

  const [code, setCode] = useState("")
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, signIn } = useContext(AuthContext)

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
        await register(user?.mail, user?.password, user?.name, user?.phone, code)

        await signIn(user.mail, user.password);
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
              await LoginService._sendRegisterCode(user?.mail)

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
    <ModalComponent visible={visible} onClose={hideModal}>
      <Spinner loading={loading} />
      <Container>
        <Title>Verifique seu e-mail</Title>
        <TitleDescription>Digite o código que enviamos para: {propsComp.registerParams?.mail ?? propsComp.recoverParams?.email}</TitleDescription>
      </Container>
      <Container>
        <CodeBoxes
          value={code}
          onChangeText={(e) => setCode(e)}
          renderCell={renderInput}
          {...props}
        />
      </Container>
      <Container>
        <ButtonConfirm title={"Enviar"} onPress={handleConfirm} />
        <TouchableReset onPress={handleResetCode} >
          <TitleDescription>Reenviar código</TitleDescription>
        </TouchableReset>
      </Container>
    </ModalComponent>
  );
})

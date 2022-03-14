import { useNavigation } from '@react-navigation/native';
import * as Haptic from 'expo-haptics';
import React, { useContext, useImperativeHandle, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { Cursor, RenderCellOptions, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { AuthContext } from '../../../contexts/authContext';
import { LoginService } from '../../../services/loginService';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { ModalComponent } from '../../components/Modal';
import { Spinner } from '../../components/Spinner';
import { IModalCodeProps, IModalRef } from './@types';
import {
  ButtonConfirm,
  CodeBoxes,
  Container,
  Input,
  Title,
  TitleDescription,
  TouchableReset
} from './styles';


export const MailCodeModal = React.forwardRef<IModalRef, IModalCodeProps>((propsComp, ref) => {

  const navigation = useNavigation()

  const [code, setCode] = useState("")
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, signIn } = useContext(AuthContext)

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: code, setValue: setCode });

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

  function openModal() {

    try {
      setVisible(true)

      if (propsComp.action === 'REGISTER') {
        if (propsComp.registerParams) {
          LoginService.sendRegisterCode(propsComp.registerParams.mail as string)
        }
      }

    } catch (error) { NotificationsFlash.spillCoffee() }

  }

  function hideModal() {
    Alert.alert('Gostaria de fechar ?', 'Um novo código precisará ser enviado.', [
      {
        text: 'Não sair',
        style: 'cancel',
        onPress: () => { }
      },
      {
        text: 'Sim, quero fechar',
        style: 'destructive',
        onPress: () => setVisible(false)
      }
    ])
  }

  async function handleConfirm() {
    Keyboard.dismiss()

    propsComp.action === 'REGISTER' ? await createUser() : null
  }

  async function createUser() {

    try {
      setLoading(true)

      const user = propsComp.registerParams

      if (code.trim().length < 5) {
        NotificationsFlash.invalidCode()
        return
      }

      if (!user) {
        NotificationsFlash.spillCoffee()
        return;
      }

      await register(user?.mail, user?.password, user?.name, user?.phone, code)

      navigation.removeListener('beforeRemove', () => { })

      await signIn(user.mail, user.password);

      navigation.navigate('Tabs');
    } catch (error: any) {

      if (error?.statusCode === 412) {
        NotificationsFlash.someoneBullshit()
      }

      if (error?.statusCode === 422) {
        NotificationsFlash.spillCoffee()
      }

    } finally { setLoading(false) }
  }

  function handleResetCode() {

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
              await LoginService.sendRegisterCode(user?.mail)

              NotificationsFlash.successfullySentCode()
            }

          } catch (error) {
            Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium)

            NotificationsFlash.spillCoffee()
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
          onSubmitEditing={(e) => Keyboard.dismiss()}
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

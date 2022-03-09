import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { AuthContext } from '../../../contexts/authContext';
import { LoginServiceExceptions } from '../../../services/loginService';
import { LoginPasswordScreenProps } from '../../../settings/@types/appStackTypes';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { Spinner } from '../../components/Spinner';
import {
  ContainerBottom, ContainerTop,
  Description, EnterButton, PasswordInput, Title, Wrapper, WrapperKeyboard, ForgotPasswordTouch,
  ForgotPasswordSubtitle
} from './styles';


export const LoginPasswordScreen: React.FC<LoginPasswordScreenProps> = ({ route }) => {

  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { signIn } = useContext(AuthContext)
  const navigation = useNavigation()


  async function handleLogin() {

    Keyboard.dismiss()

    if (password.length < 5) {
      NotificationsFlash.incorrectPassword()
      return;
    }

    try {
      setLoading(true)

      await signIn(route.params.mail, password)

      navigation.navigate('Tabs')

    } catch (error: any) {
      LoginServiceExceptions.catchLogin(error)
    } finally {
      setLoading(false)
    }

  }

  function handleForgetPassword() {
    Alert.alert(
      "Gostaria de recuperar sua senha?",
      `Iremos enviar um código para : ${route.params.mail}`,
      [
        {
          text: 'Sim',
          onPress: () => navigation.navigate('ForgetPassword', { mail: route.params.mail })
        },
        {
          text: 'Não',
          onPress: () => { },
          style: 'cancel'
        }
      ]
    );
  }

  return (
    <Wrapper>
      <Spinner loading={loading} />
      <WrapperKeyboard>

        <ContainerTop>
          <Title>Oi, {route.params.mail}</Title>
          <Description>É bom ter você de volta! 🤗</Description>
        </ContainerTop>

        <ContainerBottom>
          <PasswordInput
            value={password}
            onChangeText={(t) => setPassword(t)}
          />

          <ForgotPasswordTouch onPress={handleForgetPassword} >
            <ForgotPasswordSubtitle>Esqueceu sua senha ?</ForgotPasswordSubtitle>
          </ForgotPasswordTouch>
          <EnterButton onPress={handleLogin} />
        </ContainerBottom>
      </WrapperKeyboard>

    </Wrapper>
  );
}

import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Keyboard } from 'react-native';
import { AuthContext } from '../../../contexts/authContext';
import { LoginService, LoginServiceExceptions } from '../../../services/loginService';
import { StoreService } from '../../../services/storeServices';
import { LoginPasswordScreenProps } from '../../../settings/@types/appStackTypes';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { Spinner } from '../../components/Spinner';
import { ContainerBottom, ContainerTop, Description, EnterButton, PasswordInput, Title, Wrapper, WrapperKeyboard } from './styles';


export const LoginPasswordScreen: React.FC<LoginPasswordScreenProps> = ({ route }) => {

  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { signIn } = useContext(AuthContext)
  const navigation = useNavigation()


  const handleLogin = async () => {

    Keyboard.dismiss()

    if (password.length < 5) {
      NotificationsFlash.IncorrectPassword()
      return;
    }

    try {
      setLoading(true)

      await signIn(route.params.mail, password)

      navigation.navigate('Tabs', { signUser: true })

    } catch (error: any) {
      LoginServiceExceptions.catchLogin(error)
    } finally {
      setLoading(false)
    }

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
          <EnterButton onPress={handleLogin} />
        </ContainerBottom>
      </WrapperKeyboard>

    </Wrapper>
  );
}
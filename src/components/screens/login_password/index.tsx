import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Keyboard } from 'react-native';
import { AuthContext } from '../../../contexts/auth_context';
import { LoginService } from '../../../services/login_service';
import { LoginPasswordScreenProps } from '../../../settings/navigation/interfaces/IAppStackParams';
import { NotificationsFlash } from '../../../utils/notificationsFlash_utils';
import { Spinner } from '../../component/spinner';
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
      LoginService.catchLogin(error)
    } finally {
      setLoading(false)
    }

  }

  return (
    <Wrapper>
      <Spinner loading={loading} />
      <WrapperKeyboard>

        <ContainerTop>
          <Title>Oi, Marcelle</Title>
          <Description>É bom ver você de volta! 🤗</Description>
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

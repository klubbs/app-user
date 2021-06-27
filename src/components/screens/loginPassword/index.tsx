import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Keyboard, KeyboardAvoidingView } from 'react-native';
import { AuthContext } from '../../../contexts/AuthContext';
import { LoginPasswordScreenProps } from '../../../settings/navigation/interfaces/IAppStackParams';
import { BEHAVIOR_KEYBOARD } from '../../../utils/behavior_utils';
import { NotificationsFlash } from '../../../utils/notificationsFlash_utils';
import Button from '../../component/button';
import Input from '../../component/input_line';
import { Spinner } from '../../component/spinner';
import { ContainerBottom, ContainerTop, Description, Title, Wrapper } from './styles';


const LoginPassword: React.FC<LoginPasswordScreenProps> = ({ route }) => {

  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { _signIn } = useContext(AuthContext)
  const navigation = useNavigation()


  const handleLogin = async () => {

    Keyboard.dismiss()

    if (password.length < 5) {
      NotificationsFlash.IncorrectPassword()
      return;
    }

    try {
      setLoading(true)

      await _signIn(route.params.mail, password)

      navigation.navigate('Tabs', { signUser: true })

    } catch (error: any) {

      if (error.statusCode === 403) {
        NotificationsFlash.IncorrectPassword()
      }

    } finally {
      setLoading(false)
    }

  }

  return (
    <Wrapper>
      <Spinner loading={loading} />
      <KeyboardAvoidingView behavior={BEHAVIOR_KEYBOARD} style={{ flex: 1 }}>

        <ContainerTop>
          <Title>Oi, Marcelle</Title>
          <Description>É bom ver você de volta! 🤗</Description>
        </ContainerTop>
        <ContainerBottom>

          <Input
            value={password}
            placeHolder={"Senha"}
            onChangeText={(t) => setPassword(t)}
            isPassword={true}
            keyboardType={"default"}
          />
          <Button
            text={"Entrar"}
            onPress={handleLogin}
            styleContainer={{ width: '60%' }}
          />
        </ContainerBottom>
      </KeyboardAvoidingView>

    </Wrapper>
  );
}

export default LoginPassword;

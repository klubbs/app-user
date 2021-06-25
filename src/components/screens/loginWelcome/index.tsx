import { useNavigation } from '@react-navigation/native';
import * as Haptic from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Keyboard, KeyboardAvoidingView } from 'react-native';
import { CollOffsLogoSvg } from '../../../../assets/images/colloffs-logo';
import { LoginUserExecutor } from '../../../executors/users/login-user';
import { BEHAVIOR_KEYBOARD } from '../../../utils/behavior_utils';
import { NotificationsFlash } from '../../../utils/notificationsFlash_utils';
import Button from '../../component/button';
import Input from '../../component/input_line';
import { Spinner } from '../../component/spinner';
import { ContainerBottom, ContainerTop, Description, ExplainText, Styles, Title, Wrapper } from './styles';

const LoginWelcome: React.FC = () => {

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const [keyboardOpen, setkeyboardOpen] = useState(false)

  const navigation = useNavigation();

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", () => setkeyboardOpen(true))
    Keyboard.addListener("keyboardWillHide", () => setkeyboardOpen(false))

    return () => {
      Keyboard.removeListener("keyboardWillShow", () => { })
      Keyboard.removeListener("keyboardWillHide", () => { })
    }
  }, [])

  const handleConfirm = async () => {

    try {
      setLoading(true)

      const response = await LoginUserExecutor._loginEmailAsync(email);

      if (response)
        navigation.navigate('LoginPassword', { email });
      else
        navigation.navigate('Register', { email });

    } catch (error: any) {

      Haptic.notificationAsync(Haptic.NotificationFeedbackType.Warning)

      if (error.statusCode === 422)
        await NotificationsFlash.InvalidMail()

    } finally {
      setLoading(false)
    }
  }

  return (
    <Wrapper>
      <Spinner loading={loading} />
      <KeyboardAvoidingView behavior={BEHAVIOR_KEYBOARD} style={{ flex: 1 }} >
        {!keyboardOpen && <ContainerTop>
          <Title>Vamos lá!</Title>
          <Description>
            Entre na sua conta{"\n"}
            e tenha toda a experiência!
          </Description>
        </ContainerTop>}
        <ContainerBottom>
          <ImageBackground style={Styles.imageBackgroundStyles} source={require('../../../../assets/images/welcome-login-icons.png')}>
            <CollOffsLogoSvg />
          </ImageBackground>
          <Input
            value={email}
            placeHolder={"e-mail de login"}
            onChangeText={(t) => setEmail(t)}
            style={{ marginBottom: '5%' }}
            keyboardType={"email-address"}
          />
          <Button
            text={"Entrar"}
            onPress={handleConfirm}
            styleContainer={{ marginBottom: '5%' }} />
          <ExplainText>Nós iremos te direcionar caso ainda não tenha cadastro!</ExplainText>
        </ContainerBottom>
      </KeyboardAvoidingView>

    </Wrapper >
  );
}

export default LoginWelcome;

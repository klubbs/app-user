import { useNavigation } from '@react-navigation/native';
import * as Haptic from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { KlubbsLogo } from '../../../../assets/images/klubbsLogo';
import { LoginService, LoginServiceExceptions } from '../../../services/loginService';
import { IError } from '../../../settings/@types/IResponses';
import { Spinner } from '../../components/Spinner';
import {
  ContainerBottom, ContainerTop, Description, EnterButton, ExplainText, MailInput, Title, Wrapper, WrapperImage,
  WrapperKeyboard, Subtitle
} from './styles';

const LoginWelcome: React.FC = () => {

  const navigation = useNavigation();

  const [mail, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const [keyboardOpen, setkeyboardOpen] = useState(false)

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", () => setkeyboardOpen(true))
    Keyboard.addListener("keyboardWillHide", () => setkeyboardOpen(false))

    return () => {
      Keyboard.removeListener("keyboardWillShow", () => { })
      Keyboard.removeListener("keyboardWillHide", () => { })
    }
  }, [])

  async function handleConfirm() {
    try {

      setLoading(true)

      //TODO: Validar email antes
      const response = await LoginService.validateMail(mail);

      navigation.navigate(response ? 'LoginPassword' : 'Register', { mail: mail });

    } catch (error: any) {

      Haptic.notificationAsync(Haptic.NotificationFeedbackType.Warning)

      LoginServiceExceptions.catchValidateMail(error as IError)

    } finally {
      setLoading(false)
    }
  }

  return (
    <Wrapper>
      <Spinner loading={loading} />
      <WrapperKeyboard>

        {
          !keyboardOpen && <ContainerTop>
            <Title>Vamos lá!</Title>
            <Description>Entre na sua conta{"\n"}e aproveite!</Description>
          </ContainerTop>
        }

        <ContainerBottom>

          <WrapperImage>
            <KlubbsLogo />
            <Subtitle>Sua parceria em descontos</Subtitle>
          </WrapperImage>

          <MailInput
            value={mail}
            onChangeText={(t) => setEmail(t)}
          />

          <EnterButton onPress={handleConfirm} />
          <ExplainText>Nós iremos te direcionar caso ainda não tenha cadastro!</ExplainText>

        </ContainerBottom>
      </WrapperKeyboard>

    </Wrapper >
  );
}

export default LoginWelcome;

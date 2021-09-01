import { useNavigation } from '@react-navigation/native';
import * as Haptic from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { CollOffsLogoSvg } from '../../../../assets/images/colloffs-logo';
import { LoginService } from '../../../services/login_service';
import { IError } from '../../../settings/@types/IResponses';
import { Spinner } from '../../component/spinner';
import { ContainerBottom, ContainerTop, Description, EnterButton, ExplainText, MailInput, Title, Wrapper, WrapperImage, WrapperKeyboard } from './styles';

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

  const handleConfirm = async () => {
    try {
      setLoading(true)

      const response = await LoginService.validateMail(mail);

      navigation.navigate(response ? 'LoginPassword' : 'Register', { mail: mail });

    } catch (error: any) {

      console.log(error)

      Haptic.notificationAsync(Haptic.NotificationFeedbackType.Warning)

      LoginService.catchValidateMail(error as IError)

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
            <Description>Entre na sua conta{"\n"}e tenha toda a experiência!</Description>
          </ContainerTop>
        }

        <ContainerBottom>

          <WrapperImage>
            <CollOffsLogoSvg />
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

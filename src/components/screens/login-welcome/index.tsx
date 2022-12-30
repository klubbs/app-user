import { useNavigation } from '@react-navigation/native';
import * as Haptic from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { KlubbsLogo } from '../../../../assets/images/klubbsLogo';
import { LoginService, LoginServiceExceptions } from '../../../services/login-service';
import { IError } from '../../../settings/@types/@responses';
import { Spinner } from '../../components/Spinner';
import {
  ContainerBottom,
  ContainerTop,
  Description,
  EnterButton,
  ExplainText,
  MailInput,
  Title,
  Wrapper,
  WrapperImage,
  WrapperKeyboard,
  Subtitle,
} from './styles';
import { NotificationsFlash } from '../../../utils/flash-notifications';
import { IRegisterUser } from '../../../services/@types/@login-services';

const LoginWelcome: React.FC = () => {
  const navigation = useNavigation();

  const [mail, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const [keyboardOpen, setkeyboardOpen] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => setkeyboardOpen(true));
    Keyboard.addListener('keyboardWillHide', () => setkeyboardOpen(false));

    return function cleanUp() {
      Keyboard.removeAllListeners('keyboardWillShow');
      Keyboard.removeAllListeners('keyboardWillHide');
    };
  }, []);

  async function handleConfirm() {
    try {
      setLoading(true);

      const valid = await LoginService.validatePropertyAsync(mail, 'mail');

      if (('mail' as keyof IRegisterUser) in valid) {
        NotificationsFlash.invalidMail();
        return;
      }

      const response = await LoginService.mailAlreadyInUse(mail);

      navigation.navigate(response ? 'LoginPassword' : 'Register', { mail: mail });
    } catch (error: any) {
      Haptic.notificationAsync(Haptic.NotificationFeedbackType.Warning);

      LoginServiceExceptions.catchValidateMail(error as IError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Wrapper>
      <Spinner loading={loading} />
      <WrapperKeyboard>
        {!keyboardOpen && (
          <ContainerTop>
            <Title>Vamos lá!</Title>
            <Description>Entre na sua conta{'\n'}e aproveite!</Description>
          </ContainerTop>
        )}

        <ContainerBottom>
          <WrapperImage>
            <KlubbsLogo />
            <Subtitle>Uma parceria com influência</Subtitle>
          </WrapperImage>

          <MailInput value={mail} onChangeText={(t) => setEmail(t.trim())} />

          <EnterButton onPress={handleConfirm} />
          <ExplainText>Nós iremos te direcionar caso ainda não tenha cadastro!</ExplainText>
        </ContainerBottom>
      </WrapperKeyboard>
    </Wrapper>
  );
};

export default LoginWelcome;

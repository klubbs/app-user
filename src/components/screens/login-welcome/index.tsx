import { useNavigation } from '@react-navigation/native';
import * as Haptic from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Keyboard, PanResponder } from 'react-native';
import { KlubbsLogo } from '../../../../assets/images/klubbsLogo';
import { LoginService, LoginServiceExceptions } from '../../../services/login-service';
import { IError } from '../../../settings/@types/@responses';
import { Spinner } from '../../components/Spinner';
import {
  ContainerBottom,
  EnterButton,
  ExplainText,
  MailInput,
  Wrapper,
  WrapperImage,
  WrapperKeyboard,
  Subtitle,
  DragToUpContainer,
  SubtitleRegister,
  customStyleSheet,
  ContainerInsideModal,
  ContainerScrolling,
} from './styles';
import { NotificationsFlash } from '../../../utils/flash-notifications';
import { IRegisterUser } from '../../../services/@types/@login-services';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../../../assets/constants/colors';
import { Modalize } from 'react-native-modalize';

const { height } = Dimensions.get('window');

const SUBTITLES = [
  { id: 0, title: 'Muito mais que fidelidade' },
  { id: 1, title: 'Muito mais que cupons' },
  { id: 2, title: 'Muito mais que descontos' },
  { id: 3, title: 'Muito mais que um guia de melhores estabelecimentos' },
  { id: 4, title: 'O seu app de descontos' },
];

const LoginWelcome: React.FC = () => {
  const navigation = useNavigation();
  const modalizeRef = useRef<Modalize>();
  const flatlistRef = useRef<FlatList>(null);

  const [mail, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const [keyboardOpen, setkeyboardOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const MODAL_HEIGHT = keyboardOpen ? height : height * 0.6;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy < -10;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < -50) {
          modalizeRef.current?.open();
          clearEmail();
        }
      },
    }),
  ).current;

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => setkeyboardOpen(true));
    Keyboard.addListener('keyboardWillHide', () => setkeyboardOpen(false));

    return function cleanUp() {
      Keyboard.removeAllListeners('keyboardWillShow');
      Keyboard.removeAllListeners('keyboardWillHide');
    };
  }, []);

  useEffect(() => {
    flatlistRef.current?.scrollToIndex({ index: currentIndex, animated: true });

    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % SUBTITLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [currentIndex]);

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

  function clearEmail() {
    setEmail('');
  }

  return (
    <Wrapper>
      <Spinner loading={loading} />
      <WrapperKeyboard>
        <ContainerBottom>
          <WrapperImage>
            <KlubbsLogo />
            <FlatList
              data={SUBTITLES}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={customStyleSheet.containerFlatlist}
              renderItem={({ item }) => {
                return (
                  <ContainerScrolling>
                    <Subtitle>{item.title}</Subtitle>
                  </ContainerScrolling>
                );
              }}
              horizontal
              pagingEnabled
              scrollEnabled={false}
              initialScrollIndex={currentIndex}
              ref={flatlistRef}
            />
          </WrapperImage>

          <MailInput
            placeHolder="Insira seu e-mail"
            value={mail}
            onChangeText={(t) => setEmail(t.trim())}
          />

          <EnterButton text="Entrar" onPress={handleConfirm} />
        </ContainerBottom>

        <DragToUpContainer {...panResponder.panHandlers}>
          <Feather
            name={'arrow-up-circle'}
            size={25}
            color={colors.COLOR_SECUNDARY_WHITE}
            style={{ bottom: '10%' }}
          />
          <SubtitleRegister>Não tem conta ?</SubtitleRegister>
          <ExplainText>Arrasta pra cima e vamos criar !</ExplainText>
        </DragToUpContainer>

        <Modalize
          modalHeight={MODAL_HEIGHT}
          onClose={clearEmail}
          modalStyle={customStyleSheet.modalContainer}
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
          ref={modalizeRef}
        >
          <ContainerInsideModal>
            <ExplainText>📦 Coloque seu melhor e-mail aqui e junte-se ao Klubbs !</ExplainText>
            <MailInput
              placeHolder="Coloque seu e-mail"
              value={mail}
              onChangeText={(t) => setEmail(t.trim())}
            />
            <EnterButton text="Cadastrar" onPress={handleConfirm} />
          </ContainerInsideModal>
        </Modalize>
      </WrapperKeyboard>
    </Wrapper>
  );
};

export default LoginWelcome;

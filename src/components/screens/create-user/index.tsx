import * as Haptic from 'expo-haptics';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, ScrollView, Dimensions } from 'react-native';
import { colors } from '../../../../assets/constants/colors';
import { IRegisterUser } from '../../../services/@types/@login-services';
import { LoginService } from '../../../services/login-service';
import { RegisterScreenProps } from '../../../settings/@types/@app-stack';
import { isEmpty } from '../../../utils/extensions/object-extensions';
import { NotificationsFlash } from '../../../utils/flash-notifications';
import { ModalCodeMail } from '../../modals/modal-code-mail';
import { IModalCodeMailRef } from '../../modals/modal-code-mail/@types';
import {
  Confirm,
  containerBackButton,
  ContainerBottom,
  ContainerMiddle,
  ContainerScrool,
  ContainerTop,
  Description,
  Name,
  Password,
  Phone,
  Title,
  Wrapper,
  WrapperKeyboard,
  SubtitlePassword,
} from './styles';
import { Spinner } from '../../components/spinner';

const SCROOL_INDEX = { FIRST: 0, LAST: 1 };
const WIDTH = Dimensions.get('window').width;

const Register: React.FC<RegisterScreenProps> = ({ route }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [errorInput, setErrorInput] = useState({ password: false, name: false, phone: false });
  const [currentScroll, setCurrentScroll] = useState(0);
  const [loading, setLoading] = useState(false);

  const scroolRef = useRef<ScrollView>(null);
  const modalCodeRef = useRef<IModalCodeMailRef>(null);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();

      Alert.alert(
        'Cancelar cadastro?',
        'Ao retornar, você perderá todas as informações preenchidas.',
        [
          {
            text: 'Não sair',
            style: 'cancel',
            onPress: () => null,
          },
          {
            text: 'Descartar',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ],
      );
    });
  }, []);

  const welcomeInformations = useCallback(() => {
    return currentScroll === SCROOL_INDEX.FIRST
      ? { title: `Opa, ${route.params.mail}`, description: 'Conta um pouquinho mais sobre você ?' }
      : { title: 'Para finalizar', description: 'Estamos quase acabando !' };
  }, [currentScroll]);

  const onAnimatedScroll = (isNext: boolean) => {
    Keyboard.dismiss();

    if (isNext && currentScroll === SCROOL_INDEX.LAST) {
      modalCodeRef.current?.openModal();
    }

    setCurrentScroll(isNext ? SCROOL_INDEX.LAST : SCROOL_INDEX.FIRST);

    const distance = isNext ? WIDTH : 0;

    scroolRef.current?.scrollTo({ x: distance, y: 0, animated: true });
  };

  async function handleRegister() {
    if (currentScroll !== SCROOL_INDEX.LAST) {
      onAnimatedScroll(true);
      return;
    }

    try {
      setLoading(true);

      const fieldsValidation = await LoginService.validateRegister({
        mail: route.params.mail,
        password: password,
        name: name,
        phone: phone,
      });

      if (!isEmpty(fieldsValidation)) {
        Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);

        let errorInputTmp = errorInput;

        if (('password' as keyof IRegisterUser) in fieldsValidation) {
          errorInputTmp.password = true;
        }

        if (('phone' as keyof IRegisterUser) in fieldsValidation) {
          errorInputTmp.phone = true;
        }

        if (('name' as keyof IRegisterUser) in fieldsValidation) {
          errorInputTmp.name = true;
        }

        if (errorInputTmp.phone && !errorInputTmp.password && !errorInputTmp.name) {
          NotificationsFlash.customMessage('', 'Telefone já em uso ou incorreto');
        } else {
          NotificationsFlash.incompleteRegisterInputs();
        }

        setErrorInput({ ...errorInput });

        return;
      }

      modalCodeRef.current?.openModal();
    } catch (error: any) {
      NotificationsFlash.spillCoffee();
    } finally {
      setLoading(false);
    }
  }

  const RenderScrolls = () => {
    return (
      <>
        <ContainerScrool>
          <Name
            value={name}
            onChangeText={setName}
            onTouchEnd={() =>
              errorInput.name ? setErrorInput({ ...errorInput, name: false }) : null
            }
            error={errorInput.name}
          />
          <Phone
            value={phone}
            onChangeText={(e) => setPhone(e)}
            onTouchEnd={() =>
              errorInput.phone ? setErrorInput({ ...errorInput, phone: false }) : null
            }
            error={errorInput.phone}
          />
        </ContainerScrool>

        <ContainerScrool>
          <Password
            value={password}
            onChangeText={setPassword}
            onTouchEnd={() =>
              errorInput.password ? setErrorInput({ ...errorInput, password: false }) : null
            }
            error={errorInput.password}
          />
          <SubtitlePassword>Pelo menos 5 caracteres</SubtitlePassword>
        </ContainerScrool>
      </>
    );
  };

  const RenderButtons: React.FC = () => {
    return (
      <ContainerBottom>
        {currentScroll === SCROOL_INDEX.LAST && (
          <Feather
            name={'chevron-left'}
            size={15}
            style={containerBackButton as any}
            color={
              errorInput.name || errorInput.phone ? colors.COLOR_RED : colors.COLOR_SECUNDARY_WHITE
            }
            onPress={() => onAnimatedScroll(false)}
          />
        )}

        <Confirm onPress={handleRegister}>
          <Feather name={'chevron-right'} size={15} color={colors.COLOR_WHITE} />
        </Confirm>
      </ContainerBottom>
    );
  };

  return (
    <Wrapper>
      <ContainerTop>
        <Title>{welcomeInformations().title}</Title>
        <Description>{welcomeInformations().description}</Description>
      </ContainerTop>
      <WrapperKeyboard>
        <ContainerMiddle>
          <ScrollView
            horizontal
            snapToInterval={WIDTH}
            decelerationRate={'fast'}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            scrollEnabled={false}
            ref={scroolRef}
          >
            {RenderScrolls()}
          </ScrollView>
        </ContainerMiddle>
        <RenderButtons />
      </WrapperKeyboard>
      <ModalCodeMail
        ref={modalCodeRef}
        action={'REGISTER'}
        registerParams={{ mail: route.params.mail, phone, password, name }}
      />
      <Spinner loading={loading} />
    </Wrapper>
  );
};

export default Register;

import * as Haptic from 'expo-haptics';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, ScrollView, Dimensions } from 'react-native';
import { default as COLORS } from '../../../../assets/constants/colors';
import { IRegisterUser } from '../../../services/@types/loginServiceTypes';
import { LoginService } from '../../../services/loginService';
import { RegisterScreenProps } from '../../../settings/@types/appStackTypes';
import { isEmpty, nameof } from '../../../utils/extensions/objectExtensions';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { MailCodeModal } from '../../screensModals/mailCodeModal';
import { IModalRef } from '../../screensModals/mailCodeModal/@types';
import { Confirm, containerBackButton, ContainerBottom, ContainerMiddle, ContainerScrool, ContainerTop, Description, Name, Password, Phone, Title, Wrapper, WrapperKeyboard } from './styles';


const SCROOL_INDEX = { FIRST: 0, LAST: 1 };
const WIDTH = Dimensions.get('window').width

const Register: React.FC<RegisterScreenProps> = ({ route }) => {

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const [errorInput, setErrorInput] = useState({ password: false, name: false, phone: false })
  const [currentScroll, setCurrentScroll] = useState(0)

  const scroolRef = useRef<ScrollView>(null)
  const modalCodeRef = useRef<IModalRef>(null)

  const navigation = useNavigation()

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {

      e.preventDefault()

      Alert.alert('Cancelar cadastro?', 'Ao retornar, você perderá todas as informações preenchidas.', [
        {
          text: 'Não sair',
          style: 'cancel',
          onPress: () => { }
        },
        {
          text: 'Descartar',
          style: 'destructive',
          onPress: () => navigation.dispatch(e.data.action),
        }
      ])

    })
  }, [])

  const welcomeInformations = useCallback(() => {
    return currentScroll === SCROOL_INDEX.FIRST
      ? { title: `Opa, ${route.params.mail}`, description: "Conta um pouquinho mais sobre você ?" }
      : { title: "Para finalizar", description: "Estamos quase acabando !" }

  }, [currentScroll])


  const onAnimatedScroll = (isNext: boolean) => {
    Keyboard.dismiss()


    if (isNext && currentScroll === SCROOL_INDEX.LAST) {
      modalCodeRef.current?.openModal()
    }

    setCurrentScroll(isNext ? SCROOL_INDEX.LAST : SCROOL_INDEX.FIRST)

    const distance = isNext
      ? WIDTH
      : 0

    scroolRef.current?.scrollTo({ x: distance, y: 0, animated: true })
  }

  async function handleRegister() {

    if (currentScroll !== SCROOL_INDEX.LAST) {
      onAnimatedScroll(true)
      return;
    }

    try {
      const isValidFields = LoginService
        .validateRegister({
          mail: route.params.mail,
          password: password,
          name: name,
          phone: phone
        })


      if (!isEmpty(isValidFields)) {
        Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium)

        let errorInputTmp = errorInput

        if (isValidFields.hasOwnProperty(nameof<IRegisterUser>("password"))) {
          errorInputTmp.password = true
        }

        if (isValidFields.hasOwnProperty(nameof<IRegisterUser>("phone"))) {
          errorInputTmp.phone = true
        }

        if (isValidFields.hasOwnProperty(nameof<IRegisterUser>("name"))) {
          errorInputTmp.name = true
        }

        NotificationsFlash.IncompleteRegisterInputs()

        setErrorInput({ ...errorInput })

        return;
      }

      modalCodeRef.current?.openModal()

    } catch (error: any) { NotificationsFlash.SpillCoffee() }

  }

  const RenderScrolls = () => {

    return (
      <>
        <ContainerScrool>
          <Name
            value={name}
            onChangeText={setName}
            onTouchEnd={() => errorInput.name ? setErrorInput({ ...errorInput, name: false }) : null}
            error={errorInput.name}
          />
          <Phone
            value={phone}
            onChangeText={(e) => setPhone(e)}
            onTouchEnd={() => errorInput.phone ? setErrorInput({ ...errorInput, phone: false }) : null}
            error={errorInput.phone}
          />
        </ContainerScrool>

        <ContainerScrool>
          <Password
            value={password}
            onChangeText={setPassword}
            onTouchEnd={() => errorInput.password ? setErrorInput({ ...errorInput, password: false }) : null}
            error={errorInput.password}
          />
        </ContainerScrool>
      </>
    )
  }

  const RenderButtons: React.FC = () => {

    return (
      <ContainerBottom>

        {
          currentScroll === SCROOL_INDEX.LAST &&
          <Feather
            name={"chevron-left"}
            size={15}
            style={containerBackButton as any}
            color={errorInput.name || errorInput.phone ? COLORS.COLOR_RED : COLORS.COLOR_SECUNDARY_WHITE}
            onPress={() => onAnimatedScroll(false)}
          />
        }

        <Confirm onPress={handleRegister}>
          <Feather name={"chevron-right"} size={15} color={COLORS.COLOR_WHITE} />
        </Confirm>
      </ContainerBottom>
    )
  }

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
            ref={scroolRef}>
            {RenderScrolls()}
          </ScrollView>
        </ContainerMiddle>
        <RenderButtons />

        <MailCodeModal
          ref={modalCodeRef}
          action={'REGISTER'}
          registerParams={{ mail: route.params.mail, phone, password, name }} />
      </WrapperKeyboard>


    </Wrapper>
  );
}

export default Register;

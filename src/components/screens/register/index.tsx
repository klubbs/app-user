import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Haptic from 'expo-haptics';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, ScrollView, useWindowDimensions } from 'react-native';
import { default as COLORS } from '../../../../assets/constants/colors';
import { LoginService } from '../../../services/loginService';
import { RegisterScreenProps } from '../../../settings/@types/IAppStackParams';
import { maskPhone } from '../../../utils/masksUtils';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { MailCodeModal } from '../../screensModals/mailCodeModal';
import { IModalRef } from '../../screensModals/mailCodeModal/@types';
import { Confirm, containerBackButton, ContainerBottom, ContainerMiddle, ContainerScrool, ContainerTop, Description, Name, Password, Phone, Title, Wrapper, WrapperKeyboard } from './styles';


const SCROOL_INDEX = { FIRST: 0, LAST: 1 };

const Register: React.FC<RegisterScreenProps> = ({ route }) => {

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const [errorInput, setErrorInput] = useState({ password: false, name: false, phone: false })
  const [currentScroll, setCurrentScroll] = useState(0)

  const scroolRef = useRef<ScrollView>(null)
  const modalCodeRef = useRef<IModalRef>(null)

  const navigation = useNavigation()
  const WIDTH = useWindowDimensions().width

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
      ? { title: "Opa, tudo boom ?", description: "Conta um pouquinho mais sobre você ?" }
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

  const handleConfirm = async () => {

    if (currentScroll === SCROOL_INDEX.LAST) {

      try {

        LoginService.validateUserCreateUser(route.params.mail, password, name, phone)

        LoginService._sendRegisterCode(route.params.mail)

        modalCodeRef.current?.openModal()

      } catch (error: any) {

        Haptic.notificationAsync(Haptic.NotificationFeedbackType.Error)

        let errorInputTmp = errorInput

        error.error.forEach((element: any) => {
          if (element.field === 'Name')
            errorInputTmp.name = true

          if (element.field === 'Phone')
            errorInputTmp.phone = true

          if (element.field === 'Password')
            errorInputTmp.password = true
        });

        if (errorInputTmp.name || errorInputTmp.phone)
          NotificationsFlash.IncompleteRegisterInputs()


        if (errorInputTmp.password)
          NotificationsFlash.InvalidPassword()

        setErrorInput({ ...errorInput })
      }
    } else {
      onAnimatedScroll(true)
    }
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
            value={maskPhone(phone)}
            onChangeText={(txt) => setPhone(maskPhone(txt))}
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

        {currentScroll === SCROOL_INDEX.LAST ?
          <Feather
            name={"chevron-left"}
            size={15}
            style={containerBackButton as any}
            color={errorInput.name || errorInput.phone ? COLORS.COLOR_RED : COLORS.COLOR_SECUNDARY_WHITE}
            onPress={() => onAnimatedScroll(false)}
          /> : null}


        <Confirm onPress={handleConfirm}>
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
      </WrapperKeyboard>

      <MailCodeModal ref={modalCodeRef} action={'REGISTER'} registerParams={{ mail: route.params.mail, phone, password, name }} />

    </Wrapper>
  );
}

export default Register;

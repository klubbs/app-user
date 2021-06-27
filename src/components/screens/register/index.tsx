import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Haptic from 'expo-haptics';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, ScrollView, useWindowDimensions } from 'react-native';
import { default as COLORS } from '../../../../assets/constants/colors';
import { UserDomain } from '../../../executors/users/user_domain';
import { RegisterScreenProps } from '../../../settings/navigation/interfaces/IAppStackParams';
import { BEHAVIOR_KEYBOARD } from '../../../utils/behavior_utils';
import { maskPhone } from '../../../utils/masks_utils';
import { NotificationsFlash } from '../../../utils/notificationsFlash_utils';
import Input from '../../component/input_line';
import { ModalCode } from '../../component_heavy/modal_code';
import { IModalRef } from '../../component_heavy/modal_code/types';
import { Confirm, containerBackButton, ContainerBottom, ContainerMiddle, ContainerScrool, ContainerTop, Description, Title, Wrapper } from './styles';


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

        UserDomain._validateUserCreateAsync(route.params.mail, password, name, phone)

        modalCodeRef.current?.openModal()

      } catch (error: any) {

        Haptic.notificationAsync(Haptic.NotificationFeedbackType.Error)

        let errorInputTmp = errorInput

        error.error.forEach((element: any) => {
          if (element.field === 'name')
            errorInputTmp.name = true

          if (element.field === 'phone')
            errorInputTmp.phone = true

          if (element.field === 'password')
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
        <ContainerScrool width={WIDTH}>
          <Input
            value={name}
            placeHolder={"Nome"}
            keyboardType={"default"}
            contentType={"name"}
            onChangeText={setName}
            onTouchEnd={() => errorInput.name ? setErrorInput({ ...errorInput, name: false }) : null}
            style={{ marginBottom: '10%', borderColor: errorInput.name ? COLORS.COLOR_RED : COLORS.COLOR_WHITE_40 }}
          />
          <Input
            value={maskPhone(phone)}
            placeHolder={"Telefone"}
            keyboardType={"number-pad"}
            contentType={"telephoneNumber"}
            returnkeyType={"done"}
            maxLength={17}
            onChangeText={(txt) => setPhone(maskPhone(txt))}
            onTouchEnd={() => errorInput.phone ? setErrorInput({ ...errorInput, phone: false }) : null}
            style={{ borderColor: errorInput.phone ? COLORS.COLOR_RED : COLORS.COLOR_WHITE_40 }}
          />
        </ContainerScrool>

        <ContainerScrool width={WIDTH}>
          <Input
            value={password}
            placeHolder={"Senha"}
            keyboardType={"ascii-capable"}
            contentType={"password"}
            isPassword={true}
            onChangeText={setPassword}
            onTouchEnd={() => errorInput.password ? setErrorInput({ ...errorInput, password: false }) : null}
            style={{ borderColor: errorInput.password ? COLORS.COLOR_RED : COLORS.COLOR_WHITE_40 }}
          />
        </ContainerScrool>
      </>
    )
  }

  const RenderButtons: React.FC = () => {

    return (
      <ContainerBottom>

        {currentScroll === SCROOL_INDEX.LAST ? <Feather
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
      <KeyboardAvoidingView behavior={BEHAVIOR_KEYBOARD} style={{ flex: 5 }}>
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
      </KeyboardAvoidingView>

      <ModalCode ref={modalCodeRef} action={'REGISTER'} registerParams={{ mail: route.params.mail, phone, password, name }} />

    </Wrapper>
  );
}

export default Register;

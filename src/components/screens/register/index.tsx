import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, ScrollView, useWindowDimensions } from 'react-native';
import COLORS from '../../../../assets/constants/colors';
import { BEHAVIOR_KEYBOARD } from '../../../utils/behavior_utils';
import { maskPhone } from '../../../utils/masks_utils';
import Input from '../../component/input_line';
import { Confirm, containerBackButton, ContainerBottom, ContainerMiddle, ContainerScrool, ContainerTop, Description, Title, Wrapper } from './styles';

const Register: React.FC = () => {

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")

  const [currentScroll, setCurrentScroll] = useState(0)

  const navigation = useNavigation()
  const scroolRef = useRef<ScrollView>(null)
  const WIDTH = useWindowDimensions().width

  const welcomeInformations = useCallback(() => {
    return currentScroll === 0
      ? { title: "Opa, tudo boom ?", description: "Conta um pouquinho mais sobre você ?" }
      : { title: "Para finalizar", description: "Estamos quase acabando !" }

  }, [currentScroll])

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


  const onAnimatedScroll = (isNext: boolean) => {
    Keyboard.dismiss()

    setCurrentScroll(isNext ? 1 : 0)

    const distance = isNext
      ? WIDTH
      : 0

    scroolRef.current?.scrollTo({ x: distance, y: 0, animated: true })
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
            style={{ marginBottom: '10%' }}
          />
          <Input
            value={maskPhone(phone)}
            placeHolder={"Telefone"}
            keyboardType={"number-pad"}
            contentType={"telephoneNumber"}
            returnkeyType={"done"}
            maxLength={17}
            onChangeText={(txt) => setPhone(maskPhone(txt))}
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
          />
        </ContainerScrool>
      </>
    )
  }

  const RenderButtons: React.FC = () => {

    return (
      <ContainerBottom>

        {currentScroll === 1 ? <Feather
          name={"chevron-left"}
          size={15}
          style={containerBackButton as any}
          color={COLORS.COLOR_SECUNDARY_WHITE}
          onPress={() => onAnimatedScroll(false)}
        /> : null}


        <Confirm onPress={() => onAnimatedScroll(true)}>
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

    </Wrapper>
  );
}

export default Register;

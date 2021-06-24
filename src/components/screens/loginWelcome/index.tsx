import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ImageBackground, KeyboardAvoidingView } from 'react-native';
import { CollOffsLogoSvg } from '../../../../assets/images/colloffs-logo';
import { BEHAVIOR_KEYBOARD } from '../../../utils/behavior_utils';
import Button from '../../component/button';
import Input from '../../component/input_line';
import { ContainerBottom, ContainerTop, Description, ExplainText, Styles, Title, Wrapper } from './styles';

const LoginWelcome: React.FC = () => {

  const navigation = useNavigation();

  const [email, setEmail] = useState("")

  const handleConfirm = () => {
    //Se encontrar e-mail ir para senha
    // navigation.navigate('LoginPassword');

    //Não encontrar e-mail ir para tela de registro
    navigation.navigate('Register');

  }

  return (
    <Wrapper>
      <KeyboardAvoidingView behavior={BEHAVIOR_KEYBOARD} style={{ flex: 1 }} >
        <ContainerTop>
          <Title>Vamos lá!</Title>
          <Description>
            Entre na sua conta{"\n"}
            e tenha toda a experiência!
          </Description>
        </ContainerTop>
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

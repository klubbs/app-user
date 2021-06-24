import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { BEHAVIOR_KEYBOARD } from '../../../utils/behavior_utils';
import Button from '../../component/button';
import Input from '../../component/input_line';
import { ContainerBottom, ContainerTop, Description, Title, Wrapper } from './styles';


const LoginPassword: React.FC = () => {

  const [password, setPassword] = useState("")
  const navigation = useNavigation()


  const handleLogin = () => {
    navigation.navigate('Tabs')
  }

  return (
    <Wrapper>
      <KeyboardAvoidingView behavior={BEHAVIOR_KEYBOARD} style={{ flex: 1 }}>

        <ContainerTop>
          <Title>Oi, Marcelle</Title>
          <Description>É bom ver você de volta! 🤗</Description>
        </ContainerTop>
        <ContainerBottom>

          <Input
            value={password}
            placeHolder={"Senha"}
            onChangeText={(t) => setPassword(t)}
            isPassword={true}
            keyboardType={"default"}
          />
          <Button
            text={"Entrar"}
            onPress={handleLogin}
            styleContainer={{ width: '60%' }}
          />
        </ContainerBottom>
      </KeyboardAvoidingView>

    </Wrapper>
  );
}

export default LoginPassword;

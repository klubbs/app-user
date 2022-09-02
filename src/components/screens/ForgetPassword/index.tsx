import React, { useState, useEffect, useContext, useRef } from 'react'
import { CodeField, Cursor, useClearByFocusCell } from 'react-native-confirmation-code-field'
import { useNavigation } from '@react-navigation/native';
import { ForgetPasswordScreenProps } from '../../../settings/@types/@app-stack'
import { Spinner } from '../../components/spinner'
import { LoginService } from '../../../services/login-service'
import { IError } from '../../../settings/@types/@responses'
import { isAPIException } from '../../../utils/document-utils';
import { Middlewares } from '../../../utils/middlewares';
import { NotificationsFlash } from '../../../utils/flash-notifications';
import { IRegisterUser } from '../../../services/@types/@login-services';
import { Wrapper, ConfirmButton, Input, Subtitle, Email, Password, ContainerAnimated } from './styles'
import { nameof } from '../../../utils/extensions/object-extensions';

export const ForgetPasswordScreen: React.FC<ForgetPasswordScreenProps> = ({ route }) => {

  const [loadingSpinner, setLoadingSpinner] = useState(false)
  const [code, setCode] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [activePassword, setActivePassword] = useState(false)

  const navigation = useNavigation();
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode as any,
  })

  useEffect(() => {
    try {
      LoginService.sendForgetMailCode(route.params.mail)
    } finally {

    }
  }, [])

  function renderCell({ index, symbol, isFocused, }:
    { index: any, symbol: any, isFocused: any }) {

    let textChild = null

    if (symbol) {
      textChild = symbol
    } else if (isFocused) {
      textChild = <Cursor />
    }

    return (
      <Input key={index} onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Input>
    )
  }

  function handleCode() {
    if (code.length < 5) {
      NotificationsFlash.customMessage("Código inválido", "")
      return
    }

    if (!activePassword) {
      setActivePassword(true)
    }
  }

  async function handleChangePassword() {

    try {

      setLoadingSpinner(true)

      const valid = await LoginService.validatePropertyAsync(password, 'password');

      if (nameof<IRegisterUser>('password') in valid) {
        NotificationsFlash.customMessage("Necessário ao menos 5 caracteres", 'Senha inválida', 'NEUTRAL')
        return
      }

      await LoginService.updatePassword(password, route.params.mail, code)

      NotificationsFlash.customMessage("Senha alterada com sucesso", "", "SUCCESS")

      navigation.goBack()

    } catch (error) {

      if (isAPIException(error)) {
        const errorTyped = error as IError

        if (errorTyped.statusCode === 412 && errorTyped.error[0].field.toUpperCase() === 'DENIED') {
          NotificationsFlash.invalidCode()
          setActivePassword(false)
        }
      }

    } finally {
      setLoadingSpinner(false)
    }
  }


  return (
    <Wrapper>
      <Spinner loading={loadingSpinner} />
      <Subtitle>Enviamos um código de 5 dígitos para</Subtitle>
      <Email>{route.params.mail}</Email>


      {!activePassword && <ContainerAnimated>
        <CodeField
          value={code}
          onChangeText={(e: any) => setCode(e.trim())}
          cellCount={5}
          keyboardType="default"
          textContentType="oneTimeCode"
          renderCell={renderCell}
          autoFocus={true}
          {...props}
        />
      </ContainerAnimated>
      }

      {activePassword && <ContainerAnimated>
        <Password
          value={password}
          onChangeText={(e: string) => setPassword(e.trim())}
        />
      </ContainerAnimated>
      }
      <ConfirmButton
        text={activePassword ? 'Validar' : 'Próximo'}
        onPress={() => activePassword ? handleChangePassword() : handleCode()} />
    </Wrapper>
  )
}

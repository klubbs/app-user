import React, { useState, useEffect, useContext, useRef } from 'react'
import { CodeField, Cursor, useClearByFocusCell } from 'react-native-confirmation-code-field'
import { useNavigation } from '@react-navigation/native';
import { ForgetPasswordScreenProps } from '../../../settings/@types/appStackTypes'
import { Spinner } from '../../components/Spinner'
import { LoginService } from '../../../services/loginService'
import { IError } from '../../../settings/@types/IResponses'
import { isAPIException } from '../../../utils/documentsUtils';
import { Middlewares } from '../../../utils/middlewares';
import { NotificationsFlash } from '../../../utils/notificationsFlashUtils';
import { IRegisterUser } from '../../../services/@types/loginServiceTypes';
import { Wrapper, ConfirmButton, Input, Subtitle, Email, Password, ContainerAnimated } from './styles'
import { nameof } from '../../../utils/extensions/objectExtensions';

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

			Middlewares.middlewareError(() => {
				if (isAPIException(error)) {
					const actual = error as IError
					const actualFieldError = actual.error[0].field.toUpperCase()

					switch (actual.statusCode) {
						case 412:
							if (actualFieldError === 'DENIED') {
								NotificationsFlash.invalidCode()
								setActivePassword(false)
							}
							break;

						case 409:
							if (actualFieldError === 'ESTABLISHMENT') {
								NotificationsFlash.customMessage("Esse email não faz parte do nosso cadastro",
									"Desculpe",
									"NEUTRAL"
								)
							}
							break;

						default:
							break;
					}
				}
			}, error)

		} finally { setLoadingSpinner(false) }
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
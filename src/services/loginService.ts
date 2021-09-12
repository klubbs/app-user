import { IError, IResponseMessage } from '../settings/@types/IResponses'
import api from '../settings/services/api'
import { ErrorException } from '../utils/errorException'
import { NotificationsFlash } from '../utils/notificationsFlashUtils'
import { validMail, validPhone } from '../utils/validationFields'
import { ICreateUserResponse, ILoginResponse } from './@types/IUser'

class LoginService {


  static async login(mail: string, password: string): Promise<ILoginResponse> {

    const { data } = await api.get<IResponseMessage<ILoginResponse>>('users/login', {
      auth: {
        username: mail,
        password: password
      }
    })
    return data.message
  }

  static async createUserAsync(mail: string, password: string, userName: string, phone: string, code: string): Promise<ICreateUserResponse> {

    const domain = this.createUser(mail, password, userName, phone, code);

    const { data } = await api.post<IResponseMessage<ICreateUserResponse>>('users', { mail: domain.mail, phone: domain.phone, password: domain.password, name: domain.name, code: domain.code })

    return data.message
  }

  static async _sendRegisterCode(mail: string): Promise<void> {

    this.onlyValidMail(mail)

    await api.post(`users/code/register/mail`, {}, { params: { mail: mail } })
  }

  static async validateMail(email: string): Promise<boolean> {
    console.log('dentro da validacao de email')
    if (!validMail(email))
      throw ErrorException.Throw(422)

    const { data } = await api.get<IResponseMessage<boolean>>(`users/infos/mail`, { params: { mail: email } })

    return data.message
  }

  static createUser(mail: string, password: string, name: string, phone: string, code: string): { mail: string, password: string, name: string, phone: string, code: string } {

    this.validateUserCreateUser(mail, password, name, phone)

    if (code.length < 5) {
      throw ErrorException.Throw(412, "code")
    }

    phone = phone.replace(/\D/g, "")

    return { mail, password, code, phone, name }
  }

  static validateUserCreateUser(mail: string, password: string, name: string, phone: string): void {

    const errors = []

    //TODO: ADICIONAR FLUENT TS
    if (!validMail(mail)) {
      errors.push({ field: 'Mail' })
    }

    if (name.length <= 0) {
      errors.push({ field: 'Name' })
    }

    if (!validPhone(phone)) {
      errors.push({ field: 'Phone' })
    }

    if (password.length < 5) {
      errors.push({ field: 'Password' })
    }

    if (errors.length) {
      throw ErrorException.Throw(422, "Unprocessable Entity", errors)
    }
  }

  static onlyValidMail(mail: string) {
    if (!validMail(mail)) {
      throw ErrorException.Throw(422, "Unprocessable Entity", [{ field: 'mail' }])
    }
  }

}

class LoginServiceExceptions {

  static catchValidateMail(error: IError) {
    if (error.statusCode === 422)
      NotificationsFlash.InvalidMail()
    else {
      NotificationsFlash.SpillCoffee()
    }
  }

  static catchLogin(error: IError) {
    if (error.statusCode === 403) {
      NotificationsFlash.IncorrectPassword()
    }
  }

}

export { LoginService, LoginServiceExceptions }


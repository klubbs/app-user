import { IError, IResponseMessage } from '../settings/@types/IResponses'
import api from '../settings/services/api'
import { ErrorException } from '../utils/errorException'
import { NotificationsFlash } from '../utils/notificationsFlashUtils'
import { validMail, validPhone } from '../utils/validationFields'
import { ICreateUserResponse, ILoginResponse } from './@types/userServiceTypes'
import { Validator } from 'fluentvalidation-ts'
import { ValidationErrors } from 'fluentvalidation-ts/dist/ValidationErrors'
import { IRegisterUser } from './@types/loginServiceTypes'


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

  static async registerUser(user: IRegisterUser, code: string): Promise<ICreateUserResponse> {

    const domain = this.registerContract(user, code);

    const { data } = await api.post<IResponseMessage<ICreateUserResponse>>('users', { mail: domain.mail, phone: domain.phone, password: domain.password, name: domain.name, code: domain.code })

    return data.message
  }

  static registerContract(user: IRegisterUser, code: string): IRegisterUser & { code: string } {
    user.phone = user.phone.replace(/\D/g, "")

    return { phone: user.phone, code: code, password: user.password, mail: user.mail, name: user.name }
  }

  static async sendRegisterCode(mail: string): Promise<void> {
    await api.post(`users/code/register/mail`, {}, { params: { mail: mail } })
  }

  static async validateMail(email: string): Promise<boolean> {
    if (!validMail(email))
      throw ErrorException.Throw(422)

    const { data } = await api.get<IResponseMessage<boolean>>(`users/infos/mail`, { params: { mail: email } })

    return data.message
  }

  static validateRegister(params: IRegisterUser): ValidationErrors<IRegisterUser> {
    const validator = new LoginServiceValidator()

    return validator.validate(params)
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

class LoginServiceValidator extends Validator<IRegisterUser> {
  constructor() {
    super()

    this
      .ruleFor('mail')
      .emailAddress()
      .when(src => src.mail !== undefined)

    this
      .ruleFor('name')
      .notEmpty()
      .notNull()
      .when(src => src.name !== undefined)

    this
      .ruleFor('password')
      .must(item => item.length >= 5)
      .when(src => src.password !== undefined)

    this.ruleFor('phone')
      .notEmpty()
      .matches(new RegExp(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/))
      .withMessage('Preencha com um telefone válido.')
      .when(src => src.phone !== undefined)
  }
}



export { LoginService, LoginServiceExceptions }


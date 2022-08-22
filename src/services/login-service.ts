import { IError, IResponseMessage } from '../settings/@types/@responses'
import { NotificationsFlash } from '../utils/flash-notifications'
import { beValidMail, validPhone } from '../utils/document-utils'
import { ICreateUserResponse, ILoginResponse } from './@types/@user-services'
import { AsyncValidator } from 'fluentvalidation-ts'
import { ValidationErrors } from 'fluentvalidation-ts/dist/ValidationErrors'
import { IRegisterUser } from './@types/@login-services'
import { connectionHandler, connectionHandlerAuthZN } from '../settings/connection'
import { AsyncStorageUtils } from '../utils/async-storage'

class LoginService {

  static async login(mail: string, password: string): Promise<ILoginResponse> {

    const { data } = await connectionHandlerAuthZN
      .get<IResponseMessage<ILoginResponse>>('auth/login/user', {
        params: {
          mail: mail,
          password: password
        }
      })

    await AsyncStorageUtils.createUserInStorage(data.message);

    return data.message
  }

  static async registerUser(user: IRegisterUser, code: string): Promise<ICreateUserResponse> {

    const domain = this.registerContract(user, code);

    const { data } = await connectionHandler('KLUBBS_API_URL')
      .post<IResponseMessage<ICreateUserResponse>>('users',
        { mail: domain.mail, phone: domain.phone, password: domain.password, name: domain.name, code: domain.code })

    return data.message
  }

  private static registerContract(user: IRegisterUser, code: string): IRegisterUser & { code: string } {
    user.phone = user.phone.replace(/\D/g, "")

    return { phone: user.phone, code: code, password: user.password, mail: user.mail, name: user.name }
  }

  static async sendRegisterCode(mail: string): Promise<void> {
    await connectionHandler('KLUBBS_API_URL').post(`users/code/register/mail`, {}, { params: { mail: mail } })
  }

  static async sendForgetMailCode(mail: string): Promise<void> {
    await connectionHandler('KLUBBS_API_URL').post('users/code/forget/login', {}, { params: { mail: mail } })
  }

  static async updatePassword(password: string, mail: string, code: string): Promise<void> {
    await connectionHandler('KLUBBS_API_URL')
      .put('users/update/password', { password: password, mail: mail, code: code },)
  }

  static async mailAlreadyInUse(email: string): Promise<boolean> {
    const { data } = await connectionHandler('KLUBBS_API_URL')
      .get<IResponseMessage<boolean>>(`users/infos/mail`, { params: { mail: email } })

    return data.message
  }

  static async validateRegister(params: IRegisterUser): Promise<ValidationErrors<IRegisterUser>> {
    const validator = new LoginServiceValidator()

    return await validator.validateAsync(params)
  }

  static async alreadyPhone(phone: string): Promise<boolean> {

    const { data } = await connectionHandler('KLUBBS_API_URL')
      .get<IResponseMessage<boolean>>(`users/infos/phone`, { params: { phone: phone } })

    return data.message
  }

  //TODO: Transformar em uma classe utils
  static async validatePropertyAsync(
    value: any,
    param: keyof IRegisterUser
  ): Promise<Partial<IRegisterUser>> {

    const validator = new LoginServiceValidator();

    const errors = await validator.validateAsync(
      { [param]: value } as any
    )

    return errors as Partial<IRegisterUser>
  }

}

class LoginServiceExceptions {

  static catchValidateMail(error: IError) {
    if (error.statusCode === 422)
      NotificationsFlash.invalidMail()
    else {
      NotificationsFlash.spillCoffee()
    }
  }

  static catchLogin(error: IError) {
    if (error.statusCode === 403) {
      NotificationsFlash.incorrectPassword()
    }
  }

}

class LoginServiceValidator extends AsyncValidator<IRegisterUser> {
  constructor() {
    super()

    this
      .ruleFor('mail')
      .must((mail: string) => {
        return beValidMail(mail)
      })
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
      .mustAsync(async (phone: string) => {
        try {

          if (!validPhone(phone)) {
            return false
          }

          return !(await LoginService.alreadyPhone(phone))
        } catch {
          return false
        }
      })
      .withMessage('Preencha com um telefone válido.')
      .when(src => src.phone !== undefined)
  }
}



export { LoginService, LoginServiceExceptions }


import api, { IError, IResponseMessage } from '../settings/services/api'
import { ErrorException } from '../utils/error_exception'
import { NotificationsFlash } from '../utils/notificationsFlash_utils'
import { validMail } from '../utils/validation_fields'
import { ILoginResponse } from './users/types'

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

  static async validateMail(email: string): Promise<boolean> {

    if (!validMail(email))
      throw ErrorException.Throw(422)

    const { data } = await api.get<IResponseMessage<boolean>>(`users/infos/mail`, { params: { mail: email } })

    return data.message
  }

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


export { LoginService }


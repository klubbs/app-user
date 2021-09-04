import { IError, IResponseMessage } from '../settings/@types/IResponses'
import api from '../settings/services/api'
import { ErrorException } from '../utils/errorException'
import { NotificationsFlash } from '../utils/notificationsFlashUtils'
import { validMail } from '../utils/validationFields'
import { ILoginResponse } from './@types/IUser'

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
    console.log('dentro da validacao de email')
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


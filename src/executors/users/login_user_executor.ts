import api, { IResponseMessage } from '../../settings/services/api'
import { ErrorException } from '../../utils/error_exception'
import { _validMail } from '../../utils/validation_fields'
import { ILoginResponse } from './types'

class LoginUserExecutor {

  static async _checkEmailAsync(email: string): Promise<boolean> {

    if (!_validMail(email))
      throw ErrorException.Throw(422)


    const { data } = await api.get<IResponseMessage<boolean>>(`validations/users/infos/emails/${email}`)

    console.log(data)

    return data.message
  }

  static async _login(mail: string, password: string): Promise<ILoginResponse> {

    const { data } = await api.get<IResponseMessage<ILoginResponse>>('validations/users/login', {
      auth: {
        username: mail,
        password: password
      }
    })
    return data.message
  }

}


export { LoginUserExecutor }

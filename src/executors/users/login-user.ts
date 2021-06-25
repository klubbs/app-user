import axios, { IResponseMessage } from '../../settings/services/api'
import { ErrorException } from '../../utils/error_exception'
import { _validMail } from '../../utils/validation_fields'

class LoginUserExecutor {

  static async _loginEmailAsync(email: string): Promise<boolean> {

    if (!_validMail(email))
      throw ErrorException.Throw(422)


    const { data } = await axios.get<IResponseMessage<boolean>>(`validations/users/infos/emails/${email}`)

    return data.Message
  }


}


export { LoginUserExecutor }

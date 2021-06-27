import axios, { IResponseMessage } from "../../settings/services/api";
import { ICreateUserResponse } from "./types";
import { UserDomain } from "./user_domain";


class RegisterUserExecutor {

  static async _createUserAsync(mail: string, password: string, userName: string, phone: string, code: string): Promise<ICreateUserResponse> {

    const domain = UserDomain._createUser(mail, password, userName, phone, code);

    const { data } = await axios.post<IResponseMessage<ICreateUserResponse>>('users', { email: domain.mail, phone: domain.phone, password: domain.password, name: domain.name, code: domain.code })

    return data.message
  }

  static async _sendRegisterCode(mail: string): Promise<void> {

    UserDomain._onlyValidMail(mail)

    await axios.post(`validations/users/code/register/email/${mail}`)
  }

}


export { RegisterUserExecutor };



import { ErrorException } from "../../utils/error_exception"
import { validMail, validPhone } from "../../utils/validation_fields"

export class UserDomain {


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

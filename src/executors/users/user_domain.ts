import { ErrorException } from "../../utils/error_exception"
import { _validMail, _validPhone } from "../../utils/validation_fields"

export class UserDomain {


  static _createUser(mail: string, password: string, name: string, phone: string, code: string): { mail: string, password: string, name: string, phone: string, code: string } {

    this._validateUserCreateAsync(mail, password, name, phone)

    if (code.length < 5) {
      throw ErrorException.Throw(412, "code")
    }

    phone = phone.replace(/\D/g, "")

    return { mail, password, code, phone, name }
  }

  static _validateUserCreateAsync(mail: string, password: string, name: string, phone: string): void {

    const errors = []

    if (!_validMail(mail)) {
      errors.push({ field: 'mail' })
    }

    if (name.length <= 0) {
      errors.push({ field: 'name' })
    }

    if (!_validPhone(phone)) {
      errors.push({ field: 'phone' })
    }

    if (password.length < 5) {
      errors.push({ field: 'password' })
    }

    if (errors.length) {
      throw ErrorException.Throw(422, "Unprocessable Entity", errors)
    }
  }


  static _onlyValidMail(mail: string) {
    if (!_validMail(mail)) {
      throw ErrorException.Throw(422, "Unprocessable Entity", [{ field: 'mail' }])
    }
  }

}

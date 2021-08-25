import { IError } from "../settings/services/api"

class ErrorException {

  static Throw = (code: number, message: string = "", error: any = []): IError => {
    return { message, statusCode: code, error }
  }

}

export { ErrorException }
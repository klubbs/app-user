import { IError } from '../settings/@types/@responses';
import { nameof } from './extensions/object-extensions';

export const validPhone = (number: string): boolean => {
  const reg = new RegExp(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/);

  return reg.test(number) === false ? false : true;
};

export function beValidMail(email: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email));
}

export function isAPIException(error: any) {
  if (
    error?.hasOwnProperty(nameof<IError>('error')) &&
    error?.hasOwnProperty(nameof<IError>('message')) &&
    error?.hasOwnProperty(nameof<IError>('statusCode'))
  ) {
    return true;
  } else {
    return false;
  }
}

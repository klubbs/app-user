import { KeyboardTypeOptions, ReturnKeyTypeOptions } from 'react-native'

export type IInputLine = {
  value: string
  placeHolder?: string
  keyboardType: KeyboardTypeOptions
  returnkeyType?: ReturnKeyTypeOptions
  maxLength?: number
  contentType?: contentType
  isPassword?: boolean
  onChangeText: (text: string) => void;
  style?: any
}


type contentType =
  | 'none'
  | 'URL'
  | 'addressCity'
  | 'addressCityAndState'
  | 'addressState'
  | 'countryName'
  | 'creditCardNumber'
  | 'emailAddress'
  | 'familyName'
  | 'fullStreetAddress'
  | 'givenName'
  | 'jobTitle'
  | 'location'
  | 'middleName'
  | 'name'
  | 'namePrefix'
  | 'nameSuffix'
  | 'nickname'
  | 'organizationName'
  | 'postalCode'
  | 'streetAddressLine1'
  | 'streetAddressLine2'
  | 'sublocality'
  | 'telephoneNumber'
  | 'username'
  | 'password'
  | 'newPassword'
  | 'oneTimeCode'

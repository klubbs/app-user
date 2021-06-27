export type ICreateUserResponse = { id: string, name: string, mail: string, phone: string }

export type ILoginResponse= {
  id: string
  email: string
  phone: string
  name: string
  image: string
  token: string
}

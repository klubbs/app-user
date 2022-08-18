export type ICreateUserResponse = { id: string, name: string, mail: string, phone: string }

export type ILoginResponse = {
  id: string
  mail: string
  phone: string
  name: string
  image: string
  token: string
  refresh_token: string;
  influencer_id?: string
}

export type IModalCodeProps = {
  action: 'REGISTER' | 'RECOVER'
  registerParams?: { mail: string, password: string, phone: string, name: string }
  recoverParams?: { email: string, password: string }
}

export type IModalRef = {
  hideModal: any
  openModal: any
}

export type IModalCodeProps = {
  action: 'REGISTER' | 'RECOVER'
  registerParams?: { email: string, password: string, phone: string }
  recoverParams?: { email: string, password: string }
}

export type IModalRef = {
  hideModal: any
  openModal: any
}

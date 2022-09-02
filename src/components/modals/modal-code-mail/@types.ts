export type IModalCodeMailProps = {
  action: 'REGISTER' | 'RECOVER'
  registerParams?: { mail: string, password: string, phone: string, name: string }
  recoverParams?: { email: string, password: string }
}

export type IModalCodeMailRef = {
  hideModal: any
  openModal: any
}

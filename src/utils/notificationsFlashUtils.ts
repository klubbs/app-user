import { showFlash } from 'flash-notify'

class NotificationsFlash {

  static SomeoneBullshit = () =>
    showFlash({ type: 'WARNING', title: 'Acho que alguém fez besteira', desc: 'Já estamos resolvendo este problema, desculpe.' })

  static SpillCoffee = () =>
    showFlash({ type: 'DANGER', title: 'Caiu café aqui', desc: 'Desculpe, já estamos limpando a bagunça.' })

  static DisconnectedWire = () =>
    showFlash({ type: 'NEUTRAL', title: 'Um fio desconectou', desc: 'Tente novamente mais tarde.' })

  static IncorrectPassword = () =>
    showFlash({ type: "NEUTRAL", title: 'Senha incorreta', desc: 'Será que temos um Sherlock Holmes aqui ? 🧐' })

  static ClearMemory = () =>
    showFlash({ type: 'NEUTRAL', title: 'Feito.', desc: 'Memória liberada com sucesso.' })

  static InvalidMail = () =>
    showFlash({ type: "NEUTRAL", title: 'E-mail inválido', desc: 'Verifique se o e-mail está correto.' })

  static InvalidCode = () =>
    showFlash({ type: "WARNING", title: 'Código inválido.', desc: 'Código de verificação incorreto.' })

  static InvalidPhone = () =>
    showFlash({ type: "NEUTRAL", title: 'Telefone inválido.', desc: 'Preencha com um telefone válido.' })

  static IncompleteName = () =>
    showFlash({ type: "NEUTRAL", title: '', desc: 'Faltou preencher com o seu nome.' })

  static IncompleteRegisterInputs = () =>
    showFlash({ type: "NEUTRAL", title: '', desc: 'Alguns campos parecem esta incorretos' })

  static InvalidPassword = () =>
    showFlash({
      type: "NEUTRAL", title: 'Senha inválida',
      desc: 'Sua senha deve conter 5 ou mais caracteres.'
    })

  static SuccessfullySentCode = () =>
    showFlash({ type: "NEUTRAL", title: 'Verifique seu e-mail', desc: 'Código enviado com sucesso.' })

  static CustomMessage = (title: string, message: string, type?: 'WARNING' | 'NEUTRAL' | 'DANGER' | 'SUCCESS') =>
    showFlash({ type: type ?? "NEUTRAL", title: title, desc: message })

}

export { NotificationsFlash }


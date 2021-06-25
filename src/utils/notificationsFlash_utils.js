import { showFlash } from 'flash-notify'

class NotificationsFlash {

  static SomeoneBullshit = () =>
    showFlash({ type: 'WARNING', title: 'Acho que alguém fez besteira', desc: 'Já estamos resolvendo este problema, desculpe.' })

  static DogsOut = () =>
    showFlash({ type: 'DANGER', title: 'O Cachorro fugiu.', desc: 'Acho que ele mordeu os fios...Já estamos resolvendo!' })

  static SpillCoffee = () =>
    showFlash({ type: 'DANGER', title: 'Caiu café aqui', desc: 'Desculpe, já estamos limpando a bagunça.' })

  static DisconnectedWire = () =>
    showFlash({ type: 'NEUTRAL', title: 'Um fio desconectou', desc: 'Tente novamente mais tarde.' })

  static IncorrectPassword = () =>
    showFlash({ type: "WARNING", title: 'Senha incorreta', desc: 'Será que temos um Sherlock Holmes aqui ? 🧐' })

  static InvalidMail = () =>
    showFlash({ type: "WARNING", title: 'E-mail inválido.', desc: 'Verifique se o e-mail está correto.' })

  static ClearMemory = () =>
    showFlash({ type: 'NEUTRAL', title: 'Feito.', desc: 'Memória liberada com sucesso.' })


  static PasswordValidation = () =>
    showFlash({
      type: "NEUTRAL", title: '',
      desc: 'Sua senha deve conter: ' +
        '\n' + '- Caracteres maiúsculos e minúsculos ' +
        '\n' + '- Números'
    })

}

export { NotificationsFlash }

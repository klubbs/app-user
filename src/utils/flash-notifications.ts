import { showFlash } from 'flash-notify';

class NotificationsFlash {
  static someoneBullshit = () =>
    showFlash({
      type: 'WARNING',
      title: 'Acho que alguém fez besteira',
      desc: 'Já estamos resolvendo este problema, desculpe.',
    });

  static spillCoffee = () =>
    showFlash({
      type: 'DANGER',
      title: 'Caiu café no teclado',
      desc: 'Desculpe, já estamos limpando a bagunça.',
    });

  static disconnectedWire = () =>
    showFlash({
      type: 'NEUTRAL',
      title: 'Um fio desconectou',
      desc: 'Tente novamente mais tarde.',
    });

  static incorrectPassword = () =>
    showFlash({
      type: 'NEUTRAL',
      title: 'Senha incorreta',
      desc: 'Será que temos um Sherlock Holmes aqui ? 🧐',
    });

  static invalidMail = () =>
    showFlash({
      type: 'NEUTRAL',
      title: 'E-mail inválido',
      desc: 'Verifique se o e-mail está correto.',
    });

  static invalidCode = () =>
    showFlash({
      type: 'WARNING',
      title: 'Código inválido.',
      desc: 'Código de verificação incorreto.',
    });

  static incompleteRegisterInputs = () =>
    showFlash({ type: 'NEUTRAL', title: '', desc: 'Alguns campos parecem incorretos' });

  static successfullySentCode = () =>
    showFlash({
      type: 'NEUTRAL',
      title: 'Verifique seu e-mail',
      desc: 'Código enviado com sucesso.',
    });

  static customMessage = (
    title: string,
    message: string,
    type?: 'WARNING' | 'NEUTRAL' | 'DANGER' | 'SUCCESS',
  ) => showFlash({ type: type ?? 'NEUTRAL', title: title, desc: message });
}

export { NotificationsFlash };

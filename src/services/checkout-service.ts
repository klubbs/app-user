import { IError, IResponseMessage } from "../settings/@types/@responses"
import { connectionHandler } from "../settings/connection"
import { NotificationsFlash } from "../utils/flash-notifications";

export class CheckoutService {

    static async createCheckin(amount: number, offerId: string, couponId: string, lat: number, long: number): Promise<string> {
        const { data } = await connectionHandler('KLUBBS_API_URL')
            .post<IResponseMessage<string>>('checkouts/checkin',
                {
                    offer_id: offerId,
                    coupon_id: couponId,
                    amount: amount,
                    latitude: lat,
                    longitude: long
                }
            )

        return data.message
    }

}

export class CheckoutExceptions {
    static handleCreateCheckin(errors: IError) {

        const actualError = errors.error[0].field.toLowerCase();

        switch (errors.statusCode) {
            case 412:
                switch (actualError) {
                    case 'wallet':
                        NotificationsFlash.customMessage(
                            "Cupom não está na sua carteira",
                            "Adicione o cupom a carteira antes de fazer um checkin",
                            'NEUTRAL'
                        )
                        break;

                    case 'offer disabled':
                        NotificationsFlash.customMessage(
                            "Oferta desabilitada",
                            "Esta oferta não é mais válida pelo estabelecimento",
                            'NEUTRAL'
                        )
                        break;

                    case 'offer weekday':
                        NotificationsFlash.customMessage(
                            "Oferta inválida hoje",
                            "Esta oferta não é válida para hoje",
                            'NEUTRAL'
                        )
                        break;

                    case 'user amount':
                        NotificationsFlash.customMessage(
                            "Valor mínimo",
                            "Valor total não é um valor mínimo para essa oferta",
                            'NEUTRAL'
                        )
                        break;

                    default:
                        NotificationsFlash.someoneBullshit()
                        break;
                }

            case 409:
                switch (actualError) {
                    case 'coupon':
                        NotificationsFlash.customMessage(
                            "Cupom inválido",
                            "Esse cupom não é mais válido ou não existe",
                            'WARNING'
                        )
                        break;

                    case 'offer':
                        NotificationsFlash.customMessage(
                            "Oferta inválida",
                            "Essa oferta não é válida para este cupom",
                            'WARNING'
                        )
                        break;

                    case 'store':
                        NotificationsFlash.customMessage(
                            "Estabelecimento inválido",
                            "Este não é mais um estabelecimento válido",
                            'WARNING'
                        )
                        break;

                    default:
                        NotificationsFlash.someoneBullshit()
                        break;
                }

                break;


            default:

                break;

        }
    }


}
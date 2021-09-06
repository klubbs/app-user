import api from "../settings/services/api";
import { NotificationsFlash } from "../utils/notificationsFlashUtils";
import { ICouponCheckoutResponse, IWalletCouponsReponse } from './@types/ICoupon';
import * as Haptic from 'expo-haptics';
import { IResponseMessage, IError } from "../settings/@types/IResponses";

export class CouponService {


  static async getCouponsCheckout(): Promise<ICouponCheckoutResponse[]> {
    const { data } = await api.get<IResponseMessage<ICouponCheckoutResponse[]>>('checkouts/users')

    return data.message
  }

  static async getWalletCoupons(): Promise<IWalletCouponsReponse[]> {
    const { data } = await api.get<IResponseMessage<IWalletCouponsReponse[]>>('users/wallets/coupons');

    return data.message
  }

  static async saveCouponInWallet(code: string): Promise<void> {
    await api.post('users/wallets/coupons', null, { params: { code: code } });
  }

  static valid4SaveInWallet(code: string): boolean {
    if (code.length === 10) {
      return true
    }

    return false
  }

  static catchSaveCouponInWallet(error: IError) {

    if (error.statusCode === 412) {

      const actual = error.error[0].field.toUpperCase();

      Haptic.notificationAsync(Haptic.NotificationFeedbackType.Warning)

      if (actual === "WALLET") {
        NotificationsFlash.CustomMessage('🏷 Ai sim', "Cupom já adicionado a carteira.", 'SUCCESS')
        return;
      } else if (actual === "CODE") {
        NotificationsFlash.CustomMessage('', "🛑 Cupom Inválido.", 'DANGER')
      }

    }

  }

  static async createNewCouponCode(code: string) {
    await api.post('influencer/coupon', { code: code })
  }

  static catchCreateNewCoupon(error: IError) {

    const actual = error.error[0].field.toUpperCase();

    if (error.statusCode === 422) {

      Haptic.notificationAsync(Haptic.NotificationFeedbackType.Warning)

      if (actual === "CODE") {
        NotificationsFlash.CustomMessage('Código inválido', "Espaços são proibidos e necessário 10 caracteres.", 'NEUTRAL')
        return;
      } else if (actual === "CODE EXIST") {
        NotificationsFlash.CustomMessage('Código já existe', "Este código de cupom já esta em uso.", 'NEUTRAL')
        return;
      }

    } else if (error.statusCode === 409) {
      if (actual === "CODE") {
        NotificationsFlash.CustomMessage('Código existente', "Este código de cupom já esta em uso.", 'NEUTRAL')
        return;
      }
    }

  }

}

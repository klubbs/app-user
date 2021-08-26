import api, { IError } from "../settings/services/api";
import { NotificationsFlash } from "../utils/notificationsFlash_utils";
import { IResponseMessage } from './../settings/services/api';
import { ICouponCheckoutResponse, IWalletCouponsReponse } from './interfaces/icoupon';
import * as Haptic from 'expo-haptics';

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

}

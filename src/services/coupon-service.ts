import { NotificationsFlash } from '../utils/flash-notifications';
import { IUserCheckoutsReponse, IWalletCouponsReponse } from './@types/@coupon-services';
import * as Haptic from 'expo-haptics';
import { IResponseMessage, IError } from '../settings/@types/@responses';
import { connectionHandler } from '../settings/connection';

export class CouponService {
  static async getCouponsCheckout(): Promise<IUserCheckoutsReponse[]> {
    const { data } = await connectionHandler('KLUBBS_API_URL').get<
      IResponseMessage<IUserCheckoutsReponse[]>
    >('checkouts/users');

    return data.message;
  }

  static async getWalletCoupons(): Promise<IWalletCouponsReponse[]> {
    const { data } = await connectionHandler('KLUBBS_API_URL').get<
      IResponseMessage<IWalletCouponsReponse[]>
    >('users/wallets/coupons');

    return data.message;
  }

  static async saveCouponInWallet(code: string): Promise<void> {
    await connectionHandler('KLUBBS_API_URL').post('users/wallets/coupons', null, {
      params: { code: code },
    });
  }

  static catchSaveCouponInWallet(error: IError) {
    if (error.statusCode === 412) {
      const actual = error.error[0].field.toUpperCase();

      Haptic.notificationAsync(Haptic.NotificationFeedbackType.Warning);

      if (actual === 'WALLET') {
        NotificationsFlash.customMessage('🏷 Ai sim', 'Cupom já adicionado a carteira.', 'SUCCESS');
        return;
      } else if (actual === 'CODE') {
        NotificationsFlash.customMessage('', '🛑 Cupom Inválido.', 'DANGER');
      }
    }
  }
}

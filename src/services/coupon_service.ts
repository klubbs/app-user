import api from "../settings/services/api";
import { IResponseMessage } from './../settings/services/api';
import { ICouponCheckoutResponse } from './interfaces/icoupon';

export class CouponService {


  static async getCouponsCheckout(): Promise<ICouponCheckoutResponse[]> {
    const { data } = await api.get<IResponseMessage<ICouponCheckoutResponse[]>>('checkouts/users')

    return data.message
  }

  static async saveCouponInWallet(code: string): Promise<void> {

    const { data } = await api.post('users/wallet/coupons', null, { params: { code: code } });

  }

}

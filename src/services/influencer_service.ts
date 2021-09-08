import { IInfluencerCouponsResponse } from "../components/componentHeavy/modalInfluencerCoupon/@types";
import { IError, IResponseMessage } from "../settings/@types/IResponses";
import api from "../settings/services/api";
import * as Haptic from 'expo-haptics';
import { NotificationsFlash } from "../utils/notificationsFlashUtils";
import { GetAllMasterCouponsResponse } from "./@types/IStore";

export class InfluencerService {

  static async createNewCouponCode(code: string) {
    await api.post('influencer/coupons', { code: code })
  }

  static catchCreateNewCoupon(error: IError) {

    const actual = error.error[0].field.toUpperCase();

    if (error.statusCode === 422) {

      Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light)

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

  static async getAllCouponsByInfluencer(): Promise<IInfluencerCouponsResponse[]> {

    const { data } = await api.get<IResponseMessage<IInfluencerCouponsResponse[]>>('influencer/coupons');

    return data.message;
  }

  static async getAllMasterCoupons(): Promise<GetAllMasterCouponsResponse[]> {

    const { data } = await api.get<IResponseMessage<GetAllMasterCouponsResponse[]>>('stores/coupon');

    return data.message
  }

}

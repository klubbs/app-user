import { GetAllCouponsByInfluencerResponse } from "../components/screensModals/1influencerCouponsModal/@types";
import { IError, IResponseMessage } from "../settings/@types/IResponses";
import api from "../settings/services/api";
import * as Haptic from 'expo-haptics';
import { NotificationsFlash } from "../utils/notificationsFlashUtils";
import { GetAllMasterCouponsResponse } from "./@types/storeServiceTypes";

export class InfluencerService {

  static async createNewCouponCode(code: string) {
    await api.post('influencer/coupons', { code: code })
  }

  static async getAllCouponsByInfluencer(): Promise<GetAllCouponsByInfluencerResponse[]> {

    const { data } = await api.get<IResponseMessage<GetAllCouponsByInfluencerResponse[]>>('influencer/coupons');

    return data.message;
  }

  static async getAllMasterCoupons(): Promise<GetAllMasterCouponsResponse[]> {

    const { data } = await api.get<IResponseMessage<GetAllMasterCouponsResponse[]>>('stores/coupon');

    return data.message
  }

  static async linkCouponInMasterCoupon(masterCoupons: string[], couponId: string): Promise<void> {

    //TODO: Ajustar API para receber vários cupons master
    for await (const element of masterCoupons) {
      await api.post('influencer/coupons/link', { master_coupon_id: element, coupon_id: couponId })
    }
  }

}


export class InfluencerServiceException {

  static catchCreateNewCoupon(error: IError) {

    const actual = error.error[0].field.toUpperCase();

    if (error.statusCode === 422) {

      Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light)

      if (actual === "CODE") {
        NotificationsFlash.CustomMessage('Código inválido', "Espaços são proibidos e necessário 10 caracteres.", 'NEUTRAL')
        return;
      }

    } else if (error.statusCode === 409) {
      if (actual === "CODE") {
        NotificationsFlash.CustomMessage('Código já em uso', "Este código de cupom já esta sendo usado", 'WARNING')
        return;
      }
    }
  }

  static catchLinkCoupon(error: IError) {
    const actual = error.error[0].field.toUpperCase();


    if (error.statusCode === 412) {

      Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light)

      if (actual === "MASTER COUPON") {
        NotificationsFlash.CustomMessage('Desculpe', "Um dos cupons que você escolheu não esta mais válido", 'NEUTRAL')
        return;
      } else if (actual === "COUPON") {
        NotificationsFlash.CustomMessage('Estranho', "O seu cupom não existe mais 🤔", 'NEUTRAL')
      }

    } else {
      NotificationsFlash.SomeoneBullshit()
    }

  }

}

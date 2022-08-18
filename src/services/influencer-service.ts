import { GetAllCouponsByInfluencerResponse } from "../components/modals/CouponsInfluencer/@types";
import { IError, IResponseMessage } from "../settings/@types/@responses";
import * as Haptic from 'expo-haptics';
import { NotificationsFlash } from "../utils/flash-notifications";
import { GetAllOffersResponse } from "./@types/@store-services";
import { connectionHandler } from "../settings/connection";

export class InfluencerService {

  static async createNewCouponCode(code: string) {
    await connectionHandler('KLUBBS_API_URL').post('influencer/coupons', { code: code })
  }

  static async getAllCouponsByInfluencer(): Promise<GetAllCouponsByInfluencerResponse[]> {

    const { data } = await connectionHandler('KLUBBS_API_URL')
      .get<IResponseMessage<GetAllCouponsByInfluencerResponse[]>>('influencer/coupons');

    return data.message;
  }

  static async getAllOffers(): Promise<GetAllOffersResponse[]> {

    const { data } = await connectionHandler('KLUBBS_API_URL')
      .get<IResponseMessage<GetAllOffersResponse[]>>('stores/coupon');

    return data.message
  }

  static async linkCouponInOffers(masterCoupons: string[], couponId: string): Promise<void> {
    await connectionHandler('KLUBBS_API_URL')
      .post('influencer/coupons/link', { master_coupons: masterCoupons, coupon_id: couponId })
  }

  static async RemoveOffer(offerId: string, couponId: string) {
    await connectionHandler('KLUBBS_API_URL')
      .put('influencer/coupons/offers/remove', { offers: [offerId], coupon_id: couponId })
  }

}


export class InfluencerServiceException {

  static catchCreateNewCoupon(error: IError) {

    const actual = error.error[0].field.toUpperCase();

    if (error.statusCode === 422) {

      Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light)

      if (actual === "CODE") {
        NotificationsFlash.customMessage('Código inválido', "Espaços são proibidos e necessário 10 caracteres.", 'NEUTRAL')
        return;
      }

    } else if (error.statusCode === 409) {
      if (actual === "CODE") {
        NotificationsFlash.customMessage('Código já em uso', "Este código de cupom já esta sendo usado", 'WARNING')
        return;
      }
    }
  }

  static catchLinkCoupon(error: IError) {
    const actual = error.error[0].field.toUpperCase();


    if (error.statusCode === 412) {

      Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light)

      if (actual === "MASTER COUPON") {
        NotificationsFlash.customMessage('Desculpe', "Uma das ofertas que você escolheu não esta mais válida", 'NEUTRAL')
        return;
      } else if (actual === "COUPON") {
        NotificationsFlash.customMessage('Estranho', "O seu cupom não existe mais 🤔", 'NEUTRAL')
      }

    } else {
      NotificationsFlash.someoneBullshit()
    }

  }

}

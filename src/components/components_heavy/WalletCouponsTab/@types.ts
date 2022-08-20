import { IWalletCouponsReponse } from "../../../services/@types/@coupon-services"

export type ICouponsItem = IWalletCouponsReponse & {
  influencer_image: string
  empty: boolean
}

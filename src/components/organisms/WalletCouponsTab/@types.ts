import { IWalletCouponsReponse } from "../../../services/@types/couponServiceTypes"

export type ICouponsItem = IWalletCouponsReponse & {
  influencer_image: string
  empty: boolean
}

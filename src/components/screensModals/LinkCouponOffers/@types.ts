import { GetAllCouponsByInfluencerResponse } from "../CouponsInfluencer/@types"

export type ILinkCouponOffersProps = {
  masterCoupons: { masterCouponId: string, establishmentId: string }[]
}

export type ILinkCouponOffersRef = {
  showModal: () => void
}

export type ICouponInfluencer = GetAllCouponsByInfluencerResponse & { empty?: boolean }

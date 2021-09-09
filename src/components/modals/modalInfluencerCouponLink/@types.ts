import { GetAllCouponsByInfluencerResponse } from "../modalInfluencerCoupon/@types"

export type IModalInfluencerLinkCoupons = { visible: boolean, onClose: () => void }

export type IInfluencerLinkCoupon = GetAllCouponsByInfluencerResponse & { empty?: boolean }

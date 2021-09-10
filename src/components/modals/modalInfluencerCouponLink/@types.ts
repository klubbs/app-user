import { GetAllCouponsByInfluencerResponse } from "../modalInfluencerCoupon/@types"

export type IModalInfluencerCouponLinkProps = {
  masterCoupons: { masterCouponId: string, establishmentId: string }[],
  visible: boolean,
  onClose: () => void
}

export type ICouponInfluencer = GetAllCouponsByInfluencerResponse & { empty?: boolean }

import { GetAllCouponsByInfluencerResponse } from "../CouponsInfluencer/@types"

export type IModalInfluencerCouponLinkProps = {
  masterCoupons: { masterCouponId: string, establishmentId: string }[],
  visible: boolean,
  onClose: (cancel?: boolean) => void
}

export type ICouponInfluencer = GetAllCouponsByInfluencerResponse & { empty?: boolean }

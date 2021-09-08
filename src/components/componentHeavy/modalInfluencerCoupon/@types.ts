export type IInfluencerCouponsResponse = {
  coupon_id: string,
  coupon_code: string,
  influencer_id: string,
  master_coupons: {
    master_coupon_off_percentual: number,
    master_coupon_description: string,
    master_coupon_valid_at: number,
    establishment_name: string,
    establishment_image: string
  }[]
}

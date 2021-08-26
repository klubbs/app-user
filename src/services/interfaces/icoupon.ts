export interface ICouponCheckoutResponse {
  checkout_id: string
  establishment_name: string
  created_at: number,
  off: number,
  image: string
}


export interface IWalletCouponsReponse {
  wallet_id: string
  recommendation_coupon_code: string
  coupon_off_percentual: number
  coupon_description: string
  coupon_valid_at: number
  establishment_name: string
  establishment_image: string
}

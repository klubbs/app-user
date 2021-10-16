export interface ICouponCheckoutResponse {
  checkout_id: string
  establishment_name: string
  created_at: number,
  off: number,
  image: string
}


export interface IWalletCouponsReponse {
  wallet_id: string
  coupon_code: string
  coupon_id: string
  master_coupons: IWalletCouponsResponseMasterCouponData[]
}


export interface IWalletCouponsResponseMasterCouponData {
  master_coupon_off_percentual: number,
  master_coupon_description: string,
  master_coupon_valid_at: number,
  master_coupon_working_days: number[],
  master_coupon_minimum_ticket: number,
  establishment_name: string,
  establishment_image: string
}

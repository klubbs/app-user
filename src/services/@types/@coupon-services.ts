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
  partner_image: string
  offers: IWalletCouponsResponseOfferData[]
}


export interface IWalletCouponsResponseOfferData {
  offer_id: string,
  offer_percentage: number,
  offer_description: string,
  offer_valid_at: number,
  offer_working_days: number[],
  offer_ticket: number,
  store_name: string,
  store_image: string
}

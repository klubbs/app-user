export interface IUserCheckoutsReponse {
  checkout_id: string;
  checkouted_at: number;
  pre_checkouted_at: number;
  minimun_ticket: number;
  coupon_code: string;
  coupon_id: string;
  amount: number;
  user_informed_amount: number;
  store_name: string;
  store_image: string;
  discount: number;
}

export interface IWalletCouponsReponse {
  wallet_id: string;
  coupon_code: string;
  coupon_id: string;
  partner_image: string;
  offers: IWalletCouponsResponseOfferData[];
}

export interface IWalletCouponsResponseOfferData {
  offer_id: string;
  offer_percentage: number;
  offer_description: string;
  offer_valid_at: number;
  offer_working_days: number[];
  offer_ticket: number;
  store_name: string;
  store_image: string;
}

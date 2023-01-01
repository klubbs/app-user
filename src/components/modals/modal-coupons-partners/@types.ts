export type CouponAndOffersByInfluencerResponse = {
  coupon_id: string,
  coupon_code: string,
  partner_id: string,
  offers: OffersCouponInfluencerResponse[]
}


export type OffersCouponInfluencerResponse = {
  offer_id: string,
  offer_discount: number,
  offer_description: string,
  offer_valid_at: number,
  store_name: string,
  store_image: string,
  store_id: string
}


export type IModalCouponsPartnersRef = {
  openModal: () => void
}
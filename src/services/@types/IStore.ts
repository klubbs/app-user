export type IStoresResponse = {
  id: string,
  name: string,
  description: string,
  cnpj: number,
  image: string,
  phone: number,
  openedAt: number,
  closedAt: number,
  business_category_id: string,
  latitude: number,
  longitude: number
}


export type ICategoryResponse = {
  id: string,
  description: string,
  model_business: string
}


export type GetAllMasterCouponsResponse = {
  master_coupon_id: string,
  master_coupon_off: number,
  master_coupon_valid_at: number,
  master_coupon_description: string,
  establishment_name: string,
  establishment_image: string
}

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

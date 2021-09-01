import { IResponseMessage } from '../settings/@types/IResponses'
import api from '../settings/services/api'
import { ICategoryResponse, IStoresResponse } from './@types/IStore'

class StoreService {


  static async getRestaurants(latitude: number, longitude: number): Promise<IStoresResponse[]> {
    const { data } = await api.get<IResponseMessage<IStoresResponse[]>>('stores', { params: { latitude, longitude } })

    return data.message
  }

  static async getCategories(): Promise<ICategoryResponse[]> {
    const { data } = await api.get<IResponseMessage<ICategoryResponse[]>>('stores/business-category')

    return data.message
  }

}

export { StoreService }


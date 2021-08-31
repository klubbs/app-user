import api, { IError, IResponseMessage } from '../settings/services/api'
import { ErrorException } from '../utils/error_exception'
import { NotificationsFlash } from '../utils/notificationsFlash_utils'
import { IStoresResponse } from './interfaces/istore'

class StoreService {


  static async getRestaurants(latitude: number, longitude: number) {
    const { data } = await api.get<IResponseMessage<IStoresResponse>>('stores', { params: { latitude, longitude } })
  }

}

export { StoreService }


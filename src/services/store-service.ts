import { IResponseMessage } from '../settings/@types/@responses';
import { connectionHandler } from '../settings/connection';
import {
  GetSelectedKlubbsOffersResponse,
  ICategoryResponse,
  IStoresResponse,
} from './@types/@store-services';

class StoreService {
  static async getCategories(): Promise<ICategoryResponse[]> {
    const { data } = await connectionHandler('KLUBBS_API_URL').get<
      IResponseMessage<ICategoryResponse[]>
    >('stores/business-category');

    return data.message;
  }

  static async getRestaurants(latitude: number, longitude: number): Promise<IStoresResponse[]> {
    const { data } = await connectionHandler('KLUBBS_API_URL').get<
      IResponseMessage<IStoresResponse[]>
    >('stores/all', { params: { latitude, longitude } });

    return data.message;
  }

  static async getSelectedKlubbsOffers() {
    const { data } = await connectionHandler('KLUBBS_API_URL').get<
      IResponseMessage<GetSelectedKlubbsOffersResponse[]>
    >('stores/offers/selecteds/klubbs');

    return data.message;
  }

  static async searchStore(val: string) {
    const { data } = await connectionHandler('KLUBBS_API_URL').get<
      IResponseMessage<IStoresResponse[]>
    >('stores/search/name', {
      params: {
        searchValue: val,
      },
    });

    return data.message;
  }
}

export { StoreService };

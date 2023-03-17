import AsyncStorage from '@react-native-async-storage/async-storage';
import { ICategoryResponse } from '../services/@types/@store-services';
import { ILoginResponse } from '../services/@types/@user-services';

class AsyncStorageUtils {
  static async clearAllStorage() {
    await AsyncStorage.clear();
  }

  static async createUserInStorage(user: ILoginResponse) {
    this.refreshTokensInStorage(user.token, user.refresh_token);

    await AsyncStorage.setItem('@USER:KEY', JSON.stringify(user));
  }

  static async refreshTokensInStorage(token: string, refresh?: string) {
    if (refresh) {
      await AsyncStorage.setItem('@KLUBBS_REFRESH_TOKEN:KEY', refresh);
    }

    await AsyncStorage.setItem('@KLUBBS_TOKEN:KEY', token);
  }

  static async getTokenInStorage() {
    return await AsyncStorage.getItem('@KLUBBS_TOKEN:KEY');
  }

  static async getRefreshTokenInStorage() {
    return await AsyncStorage.getItem('@KLUBBS_REFRESH_TOKEN:KEY');
  }

  static async getUserInStorage(): Promise<ILoginResponse | null> {
    const result = await AsyncStorage.getItem('@USER:KEY');

    return result != null ? JSON.parse(result) : null;
  }

  static async saveCategoriesInStorage(categories: ICategoryResponse[]) {
    const jsonValue = JSON.stringify(categories);

    await AsyncStorage.setItem('@CATEGORIES_STORES:Key', jsonValue);
  }

  static async getCategoriesInStorage(): Promise<ICategoryResponse[] | null> {
    const results = await AsyncStorage.getItem('@CATEGORIES_STORES:Key');

    return results != null ? JSON.parse(results) : null;
  }

  static async getHasFirstInstall(): Promise<boolean> {
    const result = await AsyncStorage.getItem('@KLUBBS_FIRST_INSTALLS:KEY');

    return Boolean(result);
  }

  static async setHasFirstInstall() {
    await AsyncStorage.setItem('@KLUBBS_FIRST_INSTALLS:KEY', JSON.stringify(true));
  }
}

export { AsyncStorageUtils };

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ICategoryResponse } from '../services/@types/storeServiceTypes';
import { ILoginResponse } from '../services/@types/userServiceTypes';



class AsyncStorageUtils {


  static clearAllStorage = async () => {
    await AsyncStorage.clear()
  }


  static createUserInStorage = async (user: ILoginResponse): Promise<void> => {
    await AsyncStorage.multiSet([
      ['@TOKEN:Key', user.token],
      ['@USER:Key', JSON.stringify(user)]
    ])
  }

  static getTokenInStorage = async (): Promise<string | null> => {
    const token = await AsyncStorage.getItem('@TOKEN:Key')

    return token;
  }

  static getUserInAsyncStorage = async (): Promise<ILoginResponse | null> => {
    const result = await AsyncStorage.getItem('@USER:Key')

    return result != null ? JSON.parse(result) : null;
  }

  static async saveCategoriesInStorage(categories: ICategoryResponse[]) {

    const jsonValue = JSON.stringify(categories)

    await AsyncStorage.setItem('@CATEGORIES_ESTABLISHMENTS:Key', jsonValue)

  }

  static async getCategoriesInStorage(): Promise<ICategoryResponse[] | null> {
    const results = await AsyncStorage.getItem('@CATEGORIES_ESTABLISHMENTS:Key')

    return results != null ? JSON.parse(results) : null;
  }


}


export { AsyncStorageUtils };


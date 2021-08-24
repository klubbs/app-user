import AsyncStorage from '@react-native-async-storage/async-storage';
import { ILoginResponse } from '../services/users/types';



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

    if (result !== null) {
      return JSON.parse(result) as ILoginResponse;
    } else {
      return null;
    }
  }


}


export { AsyncStorageUtils };


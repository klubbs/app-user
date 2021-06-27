import AsyncStorage from '@react-native-async-storage/async-storage';
import { ILoginResponse } from '../executors/users/types';



class AsyncStorageUtils {


  static _clearAllStorage = async () => {
    await AsyncStorage.clear()
  }


  static _createUserInStorage = async (user: ILoginResponse): Promise<void> => {
    await AsyncStorage.multiSet([
      ["@TOKEN:Key", user.token],
      ["@USER:Key", JSON.stringify(user)]
    ])
  }

  static _getUserInAsyncStorage = async (): Promise<ILoginResponse | null> => {
    const result = await AsyncStorage.getItem('@USER:Key')

    if (result !== null) {
      return JSON.parse(result) as ILoginResponse;
    } else {
      return null;
    }
  }


}


export { AsyncStorageUtils };

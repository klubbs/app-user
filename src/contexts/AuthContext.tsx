import React, { createContext, useEffect, useState } from 'react';
import { LoginUserExecutor } from '../executors/users/login_user_executor';
import { RegisterUserExecutor } from '../executors/users/register_user_executor';
import { ILoginResponse } from '../executors/users/types';
import { AsyncStorageUtils } from '../utils/async_storage';

// import { Container } from './styles';


type IAuthContextProps = {
  user: ILoginResponse | null
  _register: (mail: string, password: string, name: string, phone: string, code: string) => Promise<void>
  _signIn: (mail: string, password: string) => Promise<void>
  _reloadUser: () => Promise<void>
  _signOut: () => Promise<void>
  isRegister: boolean
}

export const AuthContext = createContext({} as IAuthContextProps);

const AuthProvider: React.FC = ({ children }) => {

  const [user, setUser] = useState<ILoginResponse | null>(null)
  const [isRegister, setIsRegister] = useState(false)

  useEffect(() => {

    _reloadUser();

  }, [])

  const _reloadUser = async (): Promise<void> => {
    const userStorage = await AsyncStorageUtils._getUserInAsyncStorage();

    setUser(userStorage)
  }

  const _signIn = async (mail: string, password: string) => {

    const userData = await LoginUserExecutor._login(mail, password);

    await AsyncStorageUtils._clearAllStorage();

    await AsyncStorageUtils._createUserInStorage(userData);

    await _reloadUser();
  }


  const _signOut = async () => {

    await AsyncStorageUtils._clearAllStorage()

    _reloadUser()
  }

  const _register = async (mail: string, password: string, name: string, phone: string, code: string) => {

    await RegisterUserExecutor._createUserAsync(mail, password, name, phone, code)

    setIsRegister(true)

  }

  useEffect(() => {

    if (isRegister) {
      setTimeout(() => {
        setIsRegister(false)
      }, 4000)
    }

  }, [isRegister])


  return (
    <AuthContext.Provider value={{ user, _register, _signIn, _reloadUser, _signOut, isRegister }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };

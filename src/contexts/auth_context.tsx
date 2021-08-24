import React, { createContext, useEffect, useState } from 'react';
import { LoginService } from '../services/login_service';
import { RegisterUserExecutor } from '../services/users/register_user_executor';
import { ILoginResponse } from '../services/users/types';
import { AsyncStorageUtils } from '../utils/async_storage';


export const AuthContext = createContext(
  {} as {
    user: ILoginResponse | null
    register: (mail: string, password: string, name: string, phone: string, code: string) => Promise<void>
    signIn: (mail: string, password: string) => Promise<void>
    reloadUser: () => Promise<void>
    logout: () => Promise<void>
    isRegister: boolean
  }
);

const AuthProvider: React.FC = ({ children }) => {

  const [user, setUser] = useState<ILoginResponse | null>(null)
  const [isRegister, setIsRegister] = useState(false)

  useEffect(() => {

    reloadUser();

  }, [])

  const reloadUser = async (): Promise<void> => {
    const userStorage = await AsyncStorageUtils.getUserInAsyncStorage();

    setUser(userStorage)
  }

  const signIn = async (mail: string, password: string) => {

    const userData = await LoginService.login(mail, password);

    await AsyncStorageUtils.createUserInStorage(userData);

    await reloadUser();
  }


  const logout = async () => {

    await AsyncStorageUtils.clearAllStorage()

    reloadUser()
  }

  const register = async (mail: string, password: string, name: string, phone: string, code: string) => {

    await RegisterUserExecutor.createUserAsync(mail, password, name, phone, code)

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
    <AuthContext.Provider value={{ user, register, signIn, reloadUser, logout, isRegister }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };


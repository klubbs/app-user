import React, { createContext, useEffect, useState } from 'react';
import { LoginService } from '../services/login-service';
import { ILoginResponse } from '../services/@types/@user-services';
import { AsyncStorageUtils } from '../utils/async-storage';
import { EventEmitter } from '../utils/emitter';

export const AuthContext = createContext(
  {} as {
    user: ILoginResponse | null;
    register: (
      mail: string,
      password: string,
      name: string,
      phone: string,
      code: string,
    ) => Promise<void>;
    signIn: (mail: string, password: string) => Promise<void>;
    reloadUser: () => Promise<void>;
    logout: () => Promise<void>;
    isRegister: boolean;
  },
);

const AuthProvider: React.FC = ({ children }: any) => {
  const [user, setUser] = useState<ILoginResponse | null>(null);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    EventEmitter.listen('LOGOUT_USER', function () {
      logout();
    });

    reloadUser();
  }, []);

  const reloadUser = async (): Promise<void> => {
    const userStorage = await AsyncStorageUtils.getUserInStorage();

    setUser(userStorage);
  };

  async function signIn(mail: string, password: string): Promise<void> {
    await LoginService.login(mail, password);

    await reloadUser();
  }

  const logout = async () => {
    await AsyncStorageUtils.clearAllStorage();

    reloadUser();
  };

  const register = async (
    mail: string,
    password: string,
    name: string,
    phone: string,
    code: string,
  ) => {
    await LoginService.registerUser({ mail, password, name, phone }, code);

    setIsRegister(true);
  };

  useEffect(() => {
    if (isRegister) {
      setTimeout(() => {
        setIsRegister(false);
      }, 4000);
    }
  }, [isRegister]);

  return (
    <AuthContext.Provider value={{ user, register, signIn, reloadUser, logout, isRegister }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

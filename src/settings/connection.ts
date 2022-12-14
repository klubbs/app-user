import { EventEmitter } from '../utils/emitter';
import axios from 'axios';
import Constants from 'expo-constants';
import { AsyncStorageUtils } from '../utils/async-storage';
import { NotificationsFlash } from '../utils/flash-notifications';
import { IError, IResponseMessage } from './@types/@responses';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { RefreshTokenResponse } from '../services/@types/@auth-services';

const URL = {
  KLUBBS_AUTHZN_URL: Constants.manifest?.extra?.KLUBBS_AUTHZN_URL,
  KLUBBS_API_URL: Constants.manifest?.extra?.KLUBBS_API_URL,
};

const connectionHandlerAuthZN = axios.create({
  baseURL: URL['KLUBBS_AUTHZN_URL'],
  timeout: 20000,
});

connectionHandlerAuthZN.interceptors.response.use(
  (response) => response,
  (error): Promise<IError> => errorInterceptor(error),
);

function connectionHandler(type: 'KLUBBS_API_URL') {
  const instance = axios.create({
    baseURL: URL[type],
    timeout: 20000,
  });

  instance.interceptors.request.use(async (config) => {
    const token = await createCredentialToken();

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error): Promise<IError> => errorInterceptor(error),
  );

  return instance;
}

function errorInterceptor(error: any) {
  console.error(error);

  if (error.response.data) {
    const statusCode = error.response.data?.statusCode;

    if (statusCode == 403) {
      EventEmitter.emit('LOGOUT_USER', {});
    }

    if (statusCode == 500) {
      NotificationsFlash.someoneBullshit();
    }

    return Promise.reject({
      message: error.response.data?.message,
      error: error.response.data?.error,
      statusCode: Number(statusCode),
    });
  }

  return Promise.reject(error);
}

async function createCredentialToken() {
  const token = await AsyncStorageUtils.getTokenInStorage();

  if (!token) {
    return await AuthService.generateAppCredential();
  }

  const isExpired = (jwt_decode<JwtPayload>(token).exp as number) * 1000 < Date.now();

  if (!isExpired) {
    return token;
  }

  const user = await AsyncStorageUtils.getUserInStorage();

  if (!user) {
    return await AuthService.generateAppCredential();
  }

  const refresh = (await AsyncStorageUtils.getRefreshTokenInStorage()) || '';

  return await AuthService.refresh(token, refresh);
}

class AuthService {
  static async generateAppCredential() {
    const { data } = await connectionHandlerAuthZN.get<IResponseMessage<{ token: string }>>(
      'auth/credentials/application',
    );

    await AsyncStorageUtils.refreshTokensInStorage(data.message.token);

    return data.message.token;
  }

  static async refresh(currentToken: string, refresh: string): Promise<string> {
    const { data } = await connectionHandlerAuthZN.get<IResponseMessage<RefreshTokenResponse>>(
      'auth/refresh',
      {
        params: {
          token: currentToken,
          refresh_token: refresh,
        },
      },
    );

    await AsyncStorageUtils.refreshTokensInStorage(data.message.token, data.message.refresh_token);

    return data.message.token;
  }
}

export { connectionHandlerAuthZN, connectionHandler };

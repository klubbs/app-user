import { EventEmitter } from '../utils/emitter';
import axios from 'axios';
import Constants from 'expo-constants';
import { AsyncStorageUtils } from '../utils/async-storage';
import { NotificationsFlash } from '../utils/flash-notifications';
import { IError } from './@types/@responses';
import { AuthService } from '../services/auth-service';
import jwt_decode, { JwtPayload } from 'jwt-decode';

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
  console.log(error);

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

export { connectionHandlerAuthZN, connectionHandler };

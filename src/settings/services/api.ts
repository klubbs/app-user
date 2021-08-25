import axios from 'axios';
import Constants from 'expo-constants';
import { AsyncStorageUtils } from '../../utils/async_storage';
import { NotificationsFlash } from '../../utils/notificationsFlash_utils';
const { showFlash } = require('flash-notify');


const axiosConfig = {
  baseURL: Constants.manifest.extra?.ENVIRONMENT_API_EARTH
}

const api = axios.create(axiosConfig);

api.interceptors.request.use(async (config) => {

  const token = await AsyncStorageUtils.getTokenInStorage();

  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config
})

api.interceptors.response.use((response) => {
  return response;
}, (error): Promise<{ message: string, error: any, statusCode: number }> => {

  console.log("########################################################")
  console.error(error)

  const statusCode = error.response.data?.statusCode

  const validationError = error.response.data?.error
  const message = error.response.data?.message

  if (statusCode === 401) {
    AsyncStorageUtils.clearAllStorage()
  }

  if (statusCode === 500) {
    NotificationsFlash.SomeoneBullshit()
  }

  return Promise.reject({ message, error: validationError, statusCode: Number(statusCode) });
});


export type IResponseMessage<T> = {
  message: T
  statusCode: number
}

export type IError = { message: string, error: any, statusCode: number }

export default api;

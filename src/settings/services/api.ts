import { EventEmitter } from './../../utils/emitter';
import axios from 'axios';
import Constants from 'expo-constants';
import { AsyncStorageUtils } from '../../utils/asyncStorageUtils';
import { NotificationsFlash } from '../../utils/notificationsFlashUtils';
const { showFlash } = require('flash-notify');
import { IError } from '../@types/IResponses'

const axiosConfig = {
  baseURL: Constants.manifest.extra?.ENVIRONMENT_API_URL
}

const api = axios.create(axiosConfig);

api.interceptors.request.use(async (config) => {

  const token = await AsyncStorageUtils.getTokenInStorage();

  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config
})

api.interceptors.response.use((response) => response,
  (error): Promise<IError> => {

    // console.log("########################################################")
    // console.error(error)
    // console.log("########################################################")

    const statusCode = error.response.data?.statusCode

    const validationError = error.response.data?.error
    const message = error.response.data?.message

    if (statusCode === 401) {
      EventEmitter.emit('LOGOUT_USER', {})
    }

    if (statusCode === 500) {
      NotificationsFlash.SomeoneBullshit()
    }

    return Promise.reject({ message, error: validationError, statusCode: Number(statusCode) });
  });


export default api;

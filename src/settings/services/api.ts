import axios from 'axios';
import Constants from 'expo-constants';
import { EventEmitter } from '../../contexts/authContext';
import { AsyncStorageUtils } from '../../utils/asyncStorageUtils';
import { NotificationsFlash } from '../../utils/notificationsFlashUtils';
const { showFlash } = require('flash-notify');
import { IError } from '../@types/IResponses'

const axiosConfig = {
  baseURL: Constants.manifest.extra?.ENVIRONMENT_API_EARTH
}

const api = axios.create(axiosConfig);

api.interceptors.request.use(async (config) => {
  console.log('chamou a api')

  const token = await AsyncStorageUtils.getTokenInStorage();

  config.baseURL = "http://192.168.0.115:5001/"

  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log(config.baseURL)

  return config
})

api.interceptors.response.use((response) => response,
  (error): Promise<IError> => {

    console.log("########################################################")
    console.error(error)
    console.log("########################################################")

    const statusCode = error.response.data?.statusCode

    const validationError = error.response.data?.error
    const message = error.response.data?.message

    if (statusCode === 401) {
      console.warn(error)
      EventEmitter.emit('LOGOUT_USER', {})
    }

    if (statusCode === 500) {
      NotificationsFlash.SomeoneBullshit()
    }

    return Promise.reject({ message, error: validationError, statusCode: Number(statusCode) });
  });


export default api;

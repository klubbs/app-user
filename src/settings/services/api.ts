import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
const { showFlash } = require('flash-notify');


const axiosConfig = {
  baseURL: Constants.manifest.extra?.ENVIRONMENT_API_EARTH
}

const api = axios.create(axiosConfig);

api.interceptors.request.use(async (config) => {

  await AsyncStorage.getItem('@Token:Key').then((value) => {
    config.headers.Authorization = `Bearer ${value}`;
  })

  return config
})

api.interceptors.response.use((response) => {
  return response;
}, (error): Promise<{ message: string, error: any, statusCode: number }> => {

  const statusCode = error.response.data?.statusCode

  const validationError = error.response.data?.error
  const message = error.response.data?.message


  return Promise.reject({ message, error: validationError, statusCode: Number(statusCode) });
});


export type IResponseMessage<T> = {
  Message: T
  StatusCode: number
}

export type IError = { message: string, error: any, statusCode: number }

export default api;

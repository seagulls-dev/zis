import axios from 'axios'
import { getLanguage } from 'helpers/langHelpers'
import store from 'redux/store'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT,
})

axiosInstance.interceptors.request.use(async (config) => {
  try {
    const state = store.getState()
    if (state.auth.authenticated) {
      config.headers = {
        Authorization: `Bearer ${state.auth.token}`,
        Language: `${getLanguage()}`,
        ...config.headers,
      }
    }
  } catch (e) {
    console.log('ProtectedApiClient error', e)
  }
  return config
})

axiosInstance.interceptors.response.use((response) => {
  const debug = localStorage.getItem('debug')
  if (debug === '1') {
  }
  return response
}, error => {
  const debug = localStorage.getItem('debug')
  if (debug === '1') {
    console.log('error response',error)
  }
  return Promise.reject(error)
})

export default {
  get<T>(url: string, config?: object) {
    return axiosInstance.get<T>(url, config)
  },
  post<T>(url: string, data = {}, config?: object) {
    return axiosInstance.post<T>(url, data, config)
  },
  put<T>(url: string, data = {}, config?: object) {
    return axiosInstance.put<T>(url, data, config)
  },
  patch<T>(url: string, data = {}, config?: object) {
    return axiosInstance.patch<T>(url, data, config)
  },
  delete(url: string, config?: object) {
    return axiosInstance.delete(url, config)
  },
  upload<T>(url: string, data: any) {
    return axiosInstance.post<T>(url, data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
  },
}

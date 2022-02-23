import axios from 'axios'
import { getLanguage } from 'helpers/langHelpers'
import { currentUser } from '../authHelpers'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT,
})

axiosInstance.interceptors.request.use(async (config) => {
  try {
    const storedToken = currentUser()

    if (storedToken) {
      config.headers = {
        Authorization: `Bearer ${storedToken}`,
        Language: `${getLanguage()}`,
        ...config.headers,
      }
    }
  } catch (e) {
    console.log('userTokenApiClient error', e)
  }
  return config
})

export default {
  get<T>(url: string) {
    return axiosInstance.get<T>(url)
  },
  post<T>(url: string, data = {}) {
    return axiosInstance.post<T>(url, data)
  },
  put<T>(url: string, data = {}, params?: object) {
    return axiosInstance.put<T>(url, data, params)
  },
  patch<T>(url: string, data = {}) {
    return axiosInstance.patch<T>(url, data)
  },
  delete(url: string, params?: object) {
    return axiosInstance.delete(url, params)
  },
  upload<T>(url: string, data: any) {
    return axiosInstance.post<T>(url, data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
  },
}

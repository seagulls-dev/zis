import apiClient from 'helpers/api/apiClient'
import {handleApiError, handleApiErrorWithNotification} from 'helpers/errorHandling'

export const passwordRequest = (
  params: {},
  cb?: (isSuccess: boolean) => void,
) => {
  apiClient
    .post('/user/password-request', params)
    .then((response) => {
      cb && cb(true)
      return response.data
    })
    .catch((error) => {
      cb && cb(false)
      handleApiErrorWithNotification(error)
      return error.data
    })
}

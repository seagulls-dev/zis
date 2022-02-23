import apiClient from 'helpers/api/apiClient'
import {handleApiError, handleApiErrorWithNotification} from 'helpers/errorHandling'
import { PasswordResetParams } from '../models'
import {successPopup} from "../../../../components/SwalPopup/swalPopup";

export const passwordReset = (
  params: PasswordResetParams,
  cb?: (isSuccess: boolean) => void,
) => {
  apiClient
    .post('/user/password-reset', params)
    .then((response) => {
      cb && cb(true)
        successPopup(response.data)
      return response.data
    })
    .catch((error) => {
      cb && cb(false)
        handleApiErrorWithNotification(error)
      return error.data
    })
}

import {
  UserLoginRequestAction,
  UserLoginResponseAction,
  UserLoginErrorAction,
} from '.'
import { LoginParams, AuthState } from '../models'
import { apiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (params: LoginParams, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | UserLoginRequestAction
        | UserLoginResponseAction
        | UserLoginErrorAction,
    ) => void,
  ) => {
    const request = new UserLoginRequestAction(params)
    dispatch(request)

    apiClient
      .post<AuthState>(`${process.env.REACT_APP_AUTH_PATH}`, params)
      .then((response) => {
        dispatch(new UserLoginResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UserLoginErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

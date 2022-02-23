import {
  CreateUserRequestAction,
  CreateUserResponseAction,
  CreateUserErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CreateUserParams } from '../models'
import { UserDetails } from 'pages/user/models'

export default (
  params: CreateUserParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreateUserRequestAction
        | CreateUserResponseAction
        | CreateUserErrorAction,
    ) => void,
  ) => {
    const request = new CreateUserRequestAction(params)
    dispatch(request)

    protectedApiClient
      .post<UserDetails>('/user/create', params)
      .then((response) => {
        dispatch(new CreateUserResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateUserErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

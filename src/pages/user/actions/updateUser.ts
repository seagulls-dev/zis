import {
  UpdateUserRequestAction,
  UpdateUserResponseAction,
  UpdateUserErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { UpdateUserParams } from '../models'
import { UserDetails } from 'pages/user/models'

export default (
  params: UpdateUserParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdateUserRequestAction
        | UpdateUserResponseAction
        | UpdateUserErrorAction,
    ) => void,
  ) => {
    const request = new UpdateUserRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<UserDetails>(`/user/update`, params)
      .then((response) => {
        dispatch(new UpdateUserResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateUserErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  ProfileUserRequestAction,
  ProfileUserResponseAction,
  ProfileUserErrorAction
} from '.'

import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { ProfileUserParams } from '../models'
import { UserDetails } from 'pages/user/models'

export default ( params: ProfileUserParams, cb?: (isSuccess: boolean) => void) => {
  return (dispatch: (args: ProfileUserRequestAction | ProfileUserResponseAction | ProfileUserErrorAction) => void) => {
    const request = new ProfileUserRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<UserDetails>('/user/profile', params)
      .then((response) => {
        dispatch(new ProfileUserResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch(error => {
        dispatch(new ProfileUserErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

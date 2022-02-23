import {
  TryToLoadUserRequestAction,
  TryToLoadUserResponseAction,
  TryToLoadUserErrorAction,
} from './index'
import { userTokenApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { UserDetails } from '../../user/models'

export default (cb?: (isSuccess: boolean) => void, expand?: string) => {
  return (
    dispatch: (
      arg:
        | TryToLoadUserRequestAction
        | TryToLoadUserResponseAction
        | TryToLoadUserErrorAction,
    ) => void,
  ) => {
    const request = new TryToLoadUserRequestAction()
    dispatch(request)
    userTokenApiClient
      .get<UserDetails>(`/user/get-self${expand ? '?expand=' + expand : ''}`)
      .then((response) => {
        dispatch(new TryToLoadUserResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new TryToLoadUserErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

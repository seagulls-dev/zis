import {
  AllUsersRequestAction,
  AllUsersResponseAction,
  AllUsersErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { UserDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void, expand?: string) => {
  return (
    dispatch: (
      arg: AllUsersRequestAction | AllUsersResponseAction | AllUsersErrorAction,
    ) => void,
  ) => {
    const request = new AllUsersRequestAction()
    dispatch(request)

    protectedApiClient
      .get<UserDetails[]>(`/user/get-all${expand ? '?expand=' + expand : ''}`)
      .then((response) => {
        dispatch(new AllUsersResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new AllUsersErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

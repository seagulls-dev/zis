import {
  UserRolesRequestAction,
  UserRolesResponseAction,
  UserRolesErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { UserDetails } from '../../user/models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg: UserRolesRequestAction | UserRolesResponseAction | UserRolesErrorAction,
    ) => void,
  ) => {
    const request = new UserRolesRequestAction()
    dispatch(request)

    protectedApiClient
      .get<UserDetails[]>(`/user/get?id=${id}&expand=roles`)
      .then((response) => {
        dispatch(new UserRolesResponseAction(request, response.data['roles']))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UserRolesErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

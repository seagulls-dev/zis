import {
  UserGroupRequestAction,
  UserGroupResponseAction,
  UserGroupErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { GroupDetails } from '../models'

export default (id?: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | UserGroupRequestAction
        | UserGroupResponseAction
        | UserGroupErrorAction,
    ) => void,
  ) => {
    const request = new UserGroupRequestAction()
    dispatch(request)
    protectedApiClient
      .get<GroupDetails>(`/user/user-group/get-tree`)
      .then((response) => {
        dispatch(new UserGroupResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UserGroupErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

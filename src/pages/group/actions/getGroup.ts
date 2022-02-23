import {
  GetUserGroupRequestAction,
  GetUserGroupResponseAction,
  GetUserGroupErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { GroupDetails } from '../models'

export default (id: string, cb?: (isSuccess: boolean) => void, token?: {}) => {
  return (
    dispatch: (
      arg:
        | GetUserGroupRequestAction
        | GetUserGroupResponseAction
        | GetUserGroupErrorAction,
    ) => void,
  ) => {
    const request = new GetUserGroupRequestAction()
    dispatch(request)
    protectedApiClient
      .get<GroupDetails>(`/user/user-group/get?id=${id}&expand=customer,users,roles`)
      .then((response) => {
        dispatch(new GetUserGroupResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetUserGroupErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

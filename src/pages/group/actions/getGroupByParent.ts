import {
  GetUserGroupByParentRequestAction,
  GetUserGroupByParentErrorAction,
  GetUserGroupByParentResponseAction
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { GroupDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (dispatch: (args: GetUserGroupByParentRequestAction | GetUserGroupByParentResponseAction | GetUserGroupByParentErrorAction) => void) => {
    const request = new GetUserGroupByParentRequestAction(id)
    dispatch(request)

    protectedApiClient.get<GroupDetails[]>(`/user/user-group/get-by-parent?id=${id}&expand=customer,users,roles`)
      .then(response => {
        dispatch(new GetUserGroupByParentResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch(error => {
        dispatch(new GetUserGroupByParentErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

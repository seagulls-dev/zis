import {
  DeleteUserGroupRequestAction,
  DeleteUserGroupResponseAction,
  DeleteUserGroupErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { DeleteGroupParams } from '../models'

export default (
  params: DeleteGroupParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | DeleteUserGroupRequestAction
        | DeleteUserGroupResponseAction
        | DeleteUserGroupErrorAction,
    ) => void,
  ) => {
    const request = new DeleteUserGroupRequestAction(params)
    dispatch(request)
    protectedApiClient
      .delete(`/user/user-group/delete`, { data: params })
      .then((response) => {
        dispatch(new DeleteUserGroupResponseAction(request, params, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteUserGroupErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

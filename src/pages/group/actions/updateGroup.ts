import {
  UpdateUserGroupRequestAction,
  UpdateUserGroupResponseAction,
  UpdateUserGroupErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { GroupDetails, UpdateGroupParams } from '../models'

export default (
  params: UpdateGroupParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdateUserGroupRequestAction
        | UpdateUserGroupResponseAction
        | UpdateUserGroupErrorAction,
    ) => void,
  ) => {
    const request = new UpdateUserGroupRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<GroupDetails>(
        `/user/user-group/update?id=${params.id}&name=${params.title}`,
        params,
      )
      .then((response) => {
        dispatch(new UpdateUserGroupResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateUserGroupErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

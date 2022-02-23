import {
  UpdateRoleInGroupRequestAction,
  UpdateRoleInGroupResponseAction,
  UpdateRoleInGroupErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { AddDeleteRoleToGroupParams, GroupDetails } from '../models'
import {CustomerDetails} from '../../billing/customer/models'

export default (
  params: AddDeleteRoleToGroupParams,
  parent: CustomerDetails,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdateRoleInGroupRequestAction
        | UpdateRoleInGroupResponseAction
        | UpdateRoleInGroupErrorAction,
    ) => void,
  ) => {
    const request = new UpdateRoleInGroupRequestAction(params)
    dispatch(request)

    protectedApiClient
      .post<GroupDetails>('/user/user-group/update-roles', params)
      .then((response) => {
        dispatch(new UpdateRoleInGroupResponseAction(request, parent, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateRoleInGroupErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

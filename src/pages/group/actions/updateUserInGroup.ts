import {
  UpdateUserInGroupRequestAction,
  UpdateUserInGroupResponseAction,
  UpdateUserInGroupErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import {AddDeleteUserToGroupParams, GroupDetails} from '../models'
import {CustomerDetails} from '../../billing/customer/models'

export default (
  params: AddDeleteUserToGroupParams,
  parent: CustomerDetails,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdateUserInGroupRequestAction
        | UpdateUserInGroupResponseAction
        | UpdateUserInGroupErrorAction,
    ) => void,
  ) => {
    const request = new UpdateUserInGroupRequestAction(params)
    dispatch(request)

    protectedApiClient
      .post<GroupDetails>('/user/user-group/update-users', params)
      .then((response) => {
        dispatch(new UpdateUserInGroupResponseAction(request, parent, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateUserInGroupErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

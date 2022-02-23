import {
  CreateUserGroupRequestAction,
  CreateUserGroupResponseAction,
  CreateUserGroupErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { GroupDetails, CreateGroupParams } from '../models'
import {CustomerDetails} from '../../billing/customer/models'

export default (
  params: CreateGroupParams,
  parent: CustomerDetails,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreateUserGroupRequestAction
        | CreateUserGroupResponseAction
        | CreateUserGroupErrorAction,
    ) => void,
  ) => {
    const request = new CreateUserGroupRequestAction(params)
    dispatch(request)

    protectedApiClient
      .post<GroupDetails>('/user/user-group/create', params)
      .then((response) => {
        dispatch(new CreateUserGroupResponseAction(request, parent, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateUserGroupErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  GetRolePermissionRequestAction,
  GetRolePermissionGroupResponseAction,
  GetRolePermissionGroupErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { RolePermissionDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetRolePermissionRequestAction
        | GetRolePermissionGroupResponseAction
        | GetRolePermissionGroupErrorAction,
    ) => void,
  ) => {
    const request = new GetRolePermissionRequestAction()
    dispatch(request)
    protectedApiClient
      .get<RolePermissionDetails[]>(`/helper/get-roles-permissions`)
      .then((response) => {
        dispatch(
          new GetRolePermissionGroupResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetRolePermissionGroupErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

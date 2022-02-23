import {
  GetRoleRequestAction,
  GetRoleResponseAction,
  GetRoleErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg: GetRoleRequestAction | GetRoleResponseAction | GetRoleErrorAction,
    ) => void,
  ) => {
    const request = new GetRoleRequestAction()
    dispatch(request)
    protectedApiClient
      .get<string[]>(`/helper/get-roles`)
      .then((response) => {
        dispatch(new GetRoleResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetRoleErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

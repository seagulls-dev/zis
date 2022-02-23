import {
  DeleteUserRequestAction,
  DeleteUserResponseAction,
  DeleteUserErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteUserRequestAction
        | DeleteUserResponseAction
        | DeleteUserErrorAction,
    ) => void,
  ) => {
    const request = new DeleteUserRequestAction()
    dispatch(request)

    protectedApiClient
      .delete(`/user/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeleteUserResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteUserErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  DeleteServerRequestAction,
  DeleteServerResponseAction,
  DeleteServerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteServerRequestAction
        | DeleteServerResponseAction
        | DeleteServerErrorAction,
    ) => void,
  ) => {
    const request = new DeleteServerRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/server/server/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeleteServerResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteServerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

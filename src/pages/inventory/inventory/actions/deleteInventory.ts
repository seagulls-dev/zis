import {
  DeleteInventoryRequestAction,
  DeleteInventoryResponseAction,
  DeleteInventoryErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteInventoryRequestAction
        | DeleteInventoryResponseAction
        | DeleteInventoryErrorAction,
    ) => void,
  ) => {
    const request = new DeleteInventoryRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/inventory/inventory/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeleteInventoryResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteInventoryErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

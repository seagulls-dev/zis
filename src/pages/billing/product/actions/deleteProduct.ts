import {
  DeleteProductRequestAction,
  DeleteProductResponseAction,
  DeleteProductErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteProductRequestAction
        | DeleteProductResponseAction
        | DeleteProductErrorAction,
    ) => void,
  ) => {
    const request = new DeleteProductRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/billing/product/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeleteProductResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteProductErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

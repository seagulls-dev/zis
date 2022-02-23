import {
  DeleteProductPriceRequestAction,
  DeleteProductPriceResponseAction,
  DeleteProductPriceErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteProductPriceRequestAction
        | DeleteProductPriceResponseAction
        | DeleteProductPriceErrorAction,
    ) => void,
  ) => {
    const request = new DeleteProductPriceRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/billing/product-price/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeleteProductPriceResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteProductPriceErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

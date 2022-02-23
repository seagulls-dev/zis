import {
  DeleteProductPriceRangeRequestAction,
  DeleteProductPriceRangeResponseAction,
  DeleteProductPriceRangeErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteProductPriceRangeRequestAction
        | DeleteProductPriceRangeResponseAction
        | DeleteProductPriceRangeErrorAction,
    ) => void,
  ) => {
    const request = new DeleteProductPriceRangeRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/billing/product-price-range/delete?id=${id}`)
      .then((response) => {
        dispatch(
          new DeleteProductPriceRangeResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteProductPriceRangeErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

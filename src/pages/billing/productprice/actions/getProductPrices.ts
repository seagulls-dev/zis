import {
  GetProductPricesRequestAction,
  GetProductPricesResponseAction,
  GetProductPricesErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { ProductPriceDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetProductPricesRequestAction
        | GetProductPricesResponseAction
        | GetProductPricesErrorAction,
    ) => void,
  ) => {
    const request = new GetProductPricesRequestAction()
    dispatch(request)

    protectedApiClient
      .get<ProductPriceDetails[]>('/billing/product-price/get-all')
      .then((response) => {
        dispatch(new GetProductPricesResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetProductPricesErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

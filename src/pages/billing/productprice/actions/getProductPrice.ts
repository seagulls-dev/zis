import {
  GetProductPriceRequestAction,
  GetProductPriceResponseAction,
  GetProductPriceErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { ProductPriceDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetProductPriceRequestAction
        | GetProductPriceResponseAction
        | GetProductPriceErrorAction,
    ) => void,
  ) => {
    const request = new GetProductPriceRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<ProductPriceDetails>(`/billing/product-price/get?id=${id}`)
      .then((response) => {
        dispatch(new GetProductPriceResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetProductPriceErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  GetProductPriceRangesRequestAction,
  GetProductPriceRangesResponseAction,
  GetProductPriceRangesErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { ProductPriceRangeDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetProductPriceRangesRequestAction
        | GetProductPriceRangesResponseAction
        | GetProductPriceRangesErrorAction,
    ) => void,
  ) => {
    const request = new GetProductPriceRangesRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<ProductPriceRangeDetails[]>(
        `billing/product-price-range/get-by-product-price?product_price_id=${id}`,
      )
      .then((response) => {
        dispatch(
          new GetProductPriceRangesResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetProductPriceRangesErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

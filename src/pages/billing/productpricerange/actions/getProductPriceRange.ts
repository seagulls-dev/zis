import {
  GetProductPriceRangeRequestAction,
  GetProductPriceRangeResponseAction,
  GetProductPriceRangeErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { ProductPriceRangeDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetProductPriceRangeRequestAction
        | GetProductPriceRangeResponseAction
        | GetProductPriceRangeErrorAction,
    ) => void,
  ) => {
    const request = new GetProductPriceRangeRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<ProductPriceRangeDetails>(
        `/billing/product-price-range/get?id=${id}`,
      )
      .then((response) => {
        dispatch(new GetProductPriceRangeResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetProductPriceRangeErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

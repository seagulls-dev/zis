import {
  UpdateProductPriceRangeRequestAction,
  UpdateProductPriceRangeResponseAction,
  UpdateProductPriceRangeErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import {
  ProductPriceRangeDetails,
  UpdateProductPriceRangeParams,
} from '../models'

export default (
  params: UpdateProductPriceRangeParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdateProductPriceRangeRequestAction
        | UpdateProductPriceRangeResponseAction
        | UpdateProductPriceRangeErrorAction,
    ) => void,
  ) => {
    const request = new UpdateProductPriceRangeRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<ProductPriceRangeDetails>(
        `/billing/product-price-range/update`,
        params,
      )
      .then((response) => {
        dispatch(
          new UpdateProductPriceRangeResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateProductPriceRangeErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

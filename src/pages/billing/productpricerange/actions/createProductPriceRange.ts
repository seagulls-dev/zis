import {
  CreateProductPriceRangeRequestAction,
  CreateProductPriceRangeResponseAction,
  CreateProductPriceRangeErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import {
  CreateProductPriceRangeParams,
  ProductPriceRangeDetails,
} from '../models'

export default (
  params: CreateProductPriceRangeParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreateProductPriceRangeRequestAction
        | CreateProductPriceRangeResponseAction
        | CreateProductPriceRangeErrorAction,
    ) => void,
  ) => {
    const request = new CreateProductPriceRangeRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<ProductPriceRangeDetails>(
        '/billing/product-price-range/create',
        params,
      )
      .then((response) => {
        dispatch(
          new CreateProductPriceRangeResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateProductPriceRangeErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

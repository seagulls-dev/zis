import {
  CreateProductPriceRequestAction,
  CreateProductPriceResponseAction,
  CreateProductPriceErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CreateProductPriceParams, ProductPriceDetails } from '../models'

export default (
  params: CreateProductPriceParams,
  cb?: (isSuccess: boolean, responseId?: number) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreateProductPriceRequestAction
        | CreateProductPriceResponseAction
        | CreateProductPriceErrorAction,
    ) => void,
  ) => {
    const request = new CreateProductPriceRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<ProductPriceDetails>('/billing/product-price/create', params)
      .then((response) => {
        dispatch(new CreateProductPriceResponseAction(request, response.data))
        cb && cb(true, response.data.id)
      })
      .catch((error) => {
        dispatch(new CreateProductPriceErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

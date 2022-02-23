import {
  UpdateProductPriceRequestAction,
  UpdateProductPriceResponseAction,
  UpdateProductPriceErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { ProductPriceDetails, UpdateProductPriceParams } from '../models'

export default (
  params: UpdateProductPriceParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdateProductPriceRequestAction
        | UpdateProductPriceResponseAction
        | UpdateProductPriceErrorAction,
    ) => void,
  ) => {
    const request = new UpdateProductPriceRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<ProductPriceDetails>(`/billing/product-price/update`, params)
      .then((response) => {
        dispatch(new UpdateProductPriceResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateProductPriceErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

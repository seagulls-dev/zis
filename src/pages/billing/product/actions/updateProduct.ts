import {
  UpdateProductRequestAction,
  UpdateProductResponseAction,
  UpdateProductErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { ProductDetails, UpdateProductParams } from '../models'

export default (
  params: UpdateProductParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdateProductRequestAction
        | UpdateProductResponseAction
        | UpdateProductErrorAction,
    ) => void,
  ) => {
    const request = new UpdateProductRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<ProductDetails>(`/billing/product/update`, params)
      .then((response) => {
        dispatch(new UpdateProductResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateProductErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

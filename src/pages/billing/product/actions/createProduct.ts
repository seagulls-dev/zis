import {
  CreateProductRequestAction,
  CreateProductResponseAction,
  CreateProductErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CreateProductParams, ProductDetails } from '../models'

export default (
  params: CreateProductParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreateProductRequestAction
        | CreateProductResponseAction
        | CreateProductErrorAction,
    ) => void,
  ) => {
    const request = new CreateProductRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<ProductDetails>('/billing/product/create', params)
      .then((response) => {
        dispatch(new CreateProductResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateProductErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  GetProductsRequestAction,
  GetProductsResponseAction,
  GetProductsErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { ProductDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetProductsRequestAction
        | GetProductsResponseAction
        | GetProductsErrorAction,
    ) => void,
  ) => {
    const request = new GetProductsRequestAction()
    dispatch(request)

    protectedApiClient
      .get<ProductDetails[]>('/billing/product/get-all')
      .then((response) => {
        dispatch(new GetProductsResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetProductsErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

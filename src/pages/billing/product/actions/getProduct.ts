import {
  GetProductRequestAction,
  GetProductResponseAction,
  GetProductErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { ProductDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetProductRequestAction
        | GetProductResponseAction
        | GetProductErrorAction,
    ) => void,
  ) => {
    const request = new GetProductRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<ProductDetails>(`/billing/product/get?id=${id}`)
      .then((response) => {
        dispatch(new GetProductResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetProductErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

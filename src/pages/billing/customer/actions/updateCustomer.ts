import {
  UpdateCustomerRequestAction,
  UpdateCustomerResponseAction,
  UpdateCustomerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CustomerDetails, CustomerParams } from '../models'

export default (params: CustomerParams, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | UpdateCustomerRequestAction
        | UpdateCustomerResponseAction
        | UpdateCustomerErrorAction,
    ) => void,
  ) => {
    const request = new UpdateCustomerRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<CustomerDetails>('/customer/update', params)
      .then((response) => {
        dispatch(new UpdateCustomerResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateCustomerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  CreateCustomerRequestAction,
  CreateCustomerResponseAction,
  CreateCustomerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CustomerDetails, CustomerParams } from '../models'

export default (params: CustomerParams, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | CreateCustomerRequestAction
        | CreateCustomerResponseAction
        | CreateCustomerErrorAction,
    ) => void,
  ) => {
    const request = new CreateCustomerRequestAction(params)
    dispatch(request)

    protectedApiClient
      .post<CustomerDetails>('/customer/create', params)
      .then((response) => {
        dispatch(new CreateCustomerResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateCustomerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

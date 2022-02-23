import {
  GetCustomerServicesRequestAction,
  GetCustomerServicesResponseAction,
  GetCustomerServicesErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CustomerServiceDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetCustomerServicesRequestAction
        | GetCustomerServicesResponseAction
        | GetCustomerServicesErrorAction,
    ) => void,
  ) => {
    const request = new GetCustomerServicesRequestAction()
    dispatch(request)

    protectedApiClient
      .get<CustomerServiceDetails[]>('/billing/customer-service/get-all')
      .then((response) => {
        dispatch(new GetCustomerServicesResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetCustomerServicesErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

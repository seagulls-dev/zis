import {
  GetCustomerServiceRequestAction,
  GetCustomerServiceResponseAction,
  GetCustomerServiceErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CustomerServiceDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetCustomerServiceRequestAction
        | GetCustomerServiceResponseAction
        | GetCustomerServiceErrorAction,
    ) => void,
  ) => {
    const request = new GetCustomerServiceRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<CustomerServiceDetails>(`/billing/customer-service/get?id=${id}`)
      .then((response) => {
        dispatch(new GetCustomerServiceResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetCustomerServiceErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

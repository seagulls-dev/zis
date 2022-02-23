import {
  UpdateCustomerServiceRequestAction,
  UpdateCustomerServiceResponseAction,
  UpdateCustomerServiceErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CustomerServiceDetails, UpdateCustomerServiceParams } from '../models'

export default (
  params: UpdateCustomerServiceParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdateCustomerServiceRequestAction
        | UpdateCustomerServiceResponseAction
        | UpdateCustomerServiceErrorAction,
    ) => void,
  ) => {
    const request = new UpdateCustomerServiceRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<CustomerServiceDetails>(`/billing/customer-service/update`, params)
      .then((response) => {
        dispatch(
          new UpdateCustomerServiceResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateCustomerServiceErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

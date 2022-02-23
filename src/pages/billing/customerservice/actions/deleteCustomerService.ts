import {
  DeleteCustomerServiceRequestAction,
  DeleteCustomerServiceResponseAction,
  DeleteCustomerServiceErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteCustomerServiceRequestAction
        | DeleteCustomerServiceResponseAction
        | DeleteCustomerServiceErrorAction,
    ) => void,
  ) => {
    const request = new DeleteCustomerServiceRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/billing/customer-service/delete?id=${id}`)
      .then((response) => {
        dispatch(
          new DeleteCustomerServiceResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteCustomerServiceErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

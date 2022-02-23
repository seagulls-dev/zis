import {
  DeleteCustomerRequestAction,
  DeleteCustomerResponseAction,
  DeleteCustomerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteCustomerRequestAction
        | DeleteCustomerResponseAction
        | DeleteCustomerErrorAction,
    ) => void,
  ) => {
    const request = new DeleteCustomerRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/customer/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeleteCustomerResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteCustomerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  DeleteInvoiceRequestAction,
  DeleteInvoiceResponseAction,
  DeleteInvoiceErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteInvoiceRequestAction
        | DeleteInvoiceResponseAction
        | DeleteInvoiceErrorAction,
    ) => void,
  ) => {
    const request = new DeleteInvoiceRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/billing/invoice/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeleteInvoiceResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteInvoiceErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

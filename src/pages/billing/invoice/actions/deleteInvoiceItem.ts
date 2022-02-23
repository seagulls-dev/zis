import {
  DeleteInvoiceItemRequestAction,
  DeleteInvoiceItemResponseAction,
  DeleteInvoiceItemErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteInvoiceItemRequestAction
        | DeleteInvoiceItemResponseAction
        | DeleteInvoiceItemErrorAction,
    ) => void,
  ) => {
    const request = new DeleteInvoiceItemRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/billing/invoice-item/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeleteInvoiceItemResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteInvoiceItemErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

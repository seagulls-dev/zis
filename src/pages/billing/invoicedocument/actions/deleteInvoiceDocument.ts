import {
  DeleteInvoiceDocumentRequestAction,
  DeleteInvoiceDocumentResponseAction,
  DeleteInvoiceDocumentErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteInvoiceDocumentRequestAction
        | DeleteInvoiceDocumentResponseAction
        | DeleteInvoiceDocumentErrorAction,
    ) => void,
  ) => {
    const request = new DeleteInvoiceDocumentRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/billing/invoice-document/delete?id=${id}`)
      .then((response) => {
        dispatch(
          new DeleteInvoiceDocumentResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteInvoiceDocumentErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

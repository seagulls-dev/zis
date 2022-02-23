import {
  DeleteInvoiceAttachmentRequestAction,
  DeleteInvoiceAttachmentResponseAction,
  DeleteInvoiceAttachmentErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteInvoiceAttachmentRequestAction
        | DeleteInvoiceAttachmentResponseAction
        | DeleteInvoiceAttachmentErrorAction,
    ) => void,
  ) => {
    const request = new DeleteInvoiceAttachmentRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/billing/invoice-attachment/delete?id=${id}`)
      .then((response) => {
        dispatch(
          new DeleteInvoiceAttachmentResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteInvoiceAttachmentErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  GetInvoiceAttachmentsRequestAction,
  GetInvoiceAttachmentsResponseAction,
  GetInvoiceAttachmentsErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { InvoiceAttachmentDetails } from '../models'

export default (invoice_id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetInvoiceAttachmentsRequestAction
        | GetInvoiceAttachmentsResponseAction
        | GetInvoiceAttachmentsErrorAction,
    ) => void,
  ) => {
    const request = new GetInvoiceAttachmentsRequestAction()
    dispatch(request)

    protectedApiClient
      .get<InvoiceAttachmentDetails[]>(`/billing/invoice-attachment/get-all-by-invoice?invoice_id=${invoice_id}`)
      .then((response) => {
        dispatch(
          new GetInvoiceAttachmentsResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetInvoiceAttachmentsErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  GetInvoiceDocumentRequestAction,
  GetInvoiceDocumentResponseAction,
  GetInvoiceDocumentErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { InvoiceDocumentDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetInvoiceDocumentRequestAction
        | GetInvoiceDocumentResponseAction
        | GetInvoiceDocumentErrorAction,
    ) => void,
  ) => {
    const request = new GetInvoiceDocumentRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<InvoiceDocumentDetails>(`/billing/invoice-document/get?id=${id}`)
      .then((response) => {
        dispatch(new GetInvoiceDocumentResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetInvoiceDocumentErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

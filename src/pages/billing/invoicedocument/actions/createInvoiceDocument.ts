import {
  CreateInvoiceDocumentRequestAction,
  CreateInvoiceDocumentResponseAction,
  CreateInvoiceDocumentErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CreateInvoiceDocumentParams, InvoiceDocumentDetails } from '../models'

export default (
  params: CreateInvoiceDocumentParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreateInvoiceDocumentRequestAction
        | CreateInvoiceDocumentResponseAction
        | CreateInvoiceDocumentErrorAction,
    ) => void,
  ) => {
    const request = new CreateInvoiceDocumentRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<InvoiceDocumentDetails>('/billing/invoice-document/create', params)
      .then((response) => {
        dispatch(
          new CreateInvoiceDocumentResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateInvoiceDocumentErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  CreateInvoiceRequestAction,
  CreateInvoiceResponseAction,
  CreateInvoiceErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CreateInvoiceParams, InvoiceDetails } from '../models'

export default (
  params: CreateInvoiceParams,
  cb?: (isSuccess: boolean, invoice_id: number) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreateInvoiceRequestAction
        | CreateInvoiceResponseAction
        | CreateInvoiceErrorAction,
    ) => void,
  ) => {
    const request = new CreateInvoiceRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<InvoiceDetails>('/billing/invoice/create', params)
      .then((response) => {
        dispatch(new CreateInvoiceResponseAction(request, response.data))
        cb && cb(true, response.data.id)
      })
      .catch((error) => {
        dispatch(new CreateInvoiceErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false, error)
      })
  }
}

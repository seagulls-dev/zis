import {
  GetInvoiceItemsRequestAction,
  GetInvoiceItemsResponseAction,
  GetInvoiceItemsErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { InvoiceItemDetails } from '../models'

export default (invoice_id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetInvoiceItemsRequestAction
        | GetInvoiceItemsResponseAction
        | GetInvoiceItemsErrorAction,
    ) => void,
  ) => {
    const request = new GetInvoiceItemsRequestAction(invoice_id)
    dispatch(request)

    protectedApiClient
      .get<InvoiceItemDetails[]>(
        `/billing/invoice-item/get-by-invoice?invoice_id=${invoice_id}`,
      )
      .then((response) => {
        dispatch(new GetInvoiceItemsResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetInvoiceItemsErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

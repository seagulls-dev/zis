import {
  GetInvoiceCostAllocationByInvoiceRequestAction,
  GetInvoiceCostAllocationByInvoiceResponseAction,
  GetInvoiceCostAllocationByInvoiceErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { InvoiceCostAllocationDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetInvoiceCostAllocationByInvoiceRequestAction
        | GetInvoiceCostAllocationByInvoiceResponseAction
        | GetInvoiceCostAllocationByInvoiceErrorAction,
    ) => void,
  ) => {
    const request = new GetInvoiceCostAllocationByInvoiceRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<InvoiceCostAllocationDetails[]>(
        `/billing/invoice-cost-allocation/get-by-invoice?invoice_id=${id}`,
      )
      .then((response) => {
        dispatch(
          new GetInvoiceCostAllocationByInvoiceResponseAction(
            request,
            response.data,
          ),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(
          new GetInvoiceCostAllocationByInvoiceErrorAction(request, error),
        )
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

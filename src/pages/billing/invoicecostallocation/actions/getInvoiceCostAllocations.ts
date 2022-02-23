import {
  GetInvoiceCostAllocationsRequestAction,
  GetInvoiceCostAllocationsResponseAction,
  GetInvoiceCostAllocationsErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { InvoiceCostAllocationDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetInvoiceCostAllocationsRequestAction
        | GetInvoiceCostAllocationsResponseAction
        | GetInvoiceCostAllocationsErrorAction,
    ) => void,
  ) => {
    const request = new GetInvoiceCostAllocationsRequestAction()
    dispatch(request)

    protectedApiClient
      .get<InvoiceCostAllocationDetails[]>(
        '/billing/invoice-cost-allocation/get-all',
      )
      .then((response) => {
        dispatch(
          new GetInvoiceCostAllocationsResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetInvoiceCostAllocationsErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

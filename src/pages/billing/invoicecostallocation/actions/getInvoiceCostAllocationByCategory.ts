import {
  GetInvoiceCostAllocationByCategoryRequestAction,
  GetInvoiceCostAllocationByCategoryResponseAction,
  GetInvoiceCostAllocationByCategoryErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { InvoiceCostAllocationDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetInvoiceCostAllocationByCategoryRequestAction
        | GetInvoiceCostAllocationByCategoryResponseAction
        | GetInvoiceCostAllocationByCategoryErrorAction,
    ) => void,
  ) => {
    const request = new GetInvoiceCostAllocationByCategoryRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<InvoiceCostAllocationDetails[]>(
        `/billing/invoice-cost-allocation/get-by-cost-allocation-category?cost_allocation_category_id=${id}`,
      )
      .then((response) => {
        dispatch(
          new GetInvoiceCostAllocationByCategoryResponseAction(
            request,
            response.data,
          ),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(
          new GetInvoiceCostAllocationByCategoryErrorAction(request, error),
        )
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

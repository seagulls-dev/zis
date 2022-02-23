import {
  GetInvoiceCostAllocationRequestAction,
  GetInvoiceCostAllocationResponseAction,
  GetInvoiceCostAllocationErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { InvoiceCostAllocationDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetInvoiceCostAllocationRequestAction
        | GetInvoiceCostAllocationResponseAction
        | GetInvoiceCostAllocationErrorAction,
    ) => void,
  ) => {
    const request = new GetInvoiceCostAllocationRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<InvoiceCostAllocationDetails>(
        `/billing/invoice-cost-allocation/get?id=${id}`,
      )
      .then((response) => {
        dispatch(
          new GetInvoiceCostAllocationResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetInvoiceCostAllocationErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

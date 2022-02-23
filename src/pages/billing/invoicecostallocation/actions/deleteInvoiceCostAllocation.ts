import {
  DeleteInvoiceCostAllocationRequestAction,
  DeleteInvoiceCostAllocationResponseAction,
  DeleteInvoiceCostAllocationErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteInvoiceCostAllocationRequestAction
        | DeleteInvoiceCostAllocationResponseAction
        | DeleteInvoiceCostAllocationErrorAction,
    ) => void,
  ) => {
    const request = new DeleteInvoiceCostAllocationRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/billing/invoice-cost-allocation/delete?id=${id}`)
      .then((response) => {
        dispatch(
          new DeleteInvoiceCostAllocationResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteInvoiceCostAllocationErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

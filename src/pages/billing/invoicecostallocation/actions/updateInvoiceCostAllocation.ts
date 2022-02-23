import {
  UpdateInvoiceCostAllocationRequestAction,
  UpdateInvoiceCostAllocationResponseAction,
  UpdateInvoiceCostAllocationErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { InvoiceCostAllocationDetails } from '../models'

export default (
  params: InvoiceCostAllocationDetails,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdateInvoiceCostAllocationRequestAction
        | UpdateInvoiceCostAllocationResponseAction
        | UpdateInvoiceCostAllocationErrorAction,
    ) => void,
  ) => {
    const request = new UpdateInvoiceCostAllocationRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<InvoiceCostAllocationDetails>(
        `/billing/invoice-cost-allocation/update`,
        params,
      )
      .then((response) => {
        dispatch(
          new UpdateInvoiceCostAllocationResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateInvoiceCostAllocationErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

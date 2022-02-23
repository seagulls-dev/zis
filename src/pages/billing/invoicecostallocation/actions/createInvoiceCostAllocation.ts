import {
  CreateInvoiceCostAllocationRequestAction,
  CreateInvoiceCostAllocationResponseAction,
  CreateInvoiceCostAllocationErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import {
  InvoiceCostAllocationParams,
  InvoiceCostAllocationDetails,
} from '../models'

export default (
  params: InvoiceCostAllocationParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreateInvoiceCostAllocationRequestAction
        | CreateInvoiceCostAllocationResponseAction
        | CreateInvoiceCostAllocationErrorAction,
    ) => void,
  ) => {
    const request = new CreateInvoiceCostAllocationRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<InvoiceCostAllocationDetails>(
        '/billing/invoice-cost-allocation/create',
        params,
      )
      .then((response) => {
        dispatch(
          new CreateInvoiceCostAllocationResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateInvoiceCostAllocationErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

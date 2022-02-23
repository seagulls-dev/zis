import {
  UpdateInvoiceRequestAction,
  UpdateInvoiceResponseAction,
  UpdateInvoiceErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { InvoiceDetails, UpdateInvoiceParams } from '../models'

export default (
  params: UpdateInvoiceParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdateInvoiceRequestAction
        | UpdateInvoiceResponseAction
        | UpdateInvoiceErrorAction,
    ) => void,
  ) => {
    const request = new UpdateInvoiceRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<InvoiceDetails>(`/billing/invoice/update`, params)
      .then((response) => {
        dispatch(new UpdateInvoiceResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateInvoiceErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

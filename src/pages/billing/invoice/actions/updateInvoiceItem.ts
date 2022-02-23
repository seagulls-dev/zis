import {
  UpdateInvoiceItemRequestAction,
  UpdateInvoiceItemResponseAction,
  UpdateInvoiceItemErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { InvoiceItemDetails } from '../models'

export default (
  params: InvoiceItemDetails,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdateInvoiceItemRequestAction
        | UpdateInvoiceItemResponseAction
        | UpdateInvoiceItemErrorAction,
    ) => void,
  ) => {
    const request = new UpdateInvoiceItemRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<InvoiceItemDetails>(`/billing/invoice-item/update`, params)
      .then((response) => {
        dispatch(new UpdateInvoiceItemResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateInvoiceItemErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

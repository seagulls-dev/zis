import {
  CreateInvoiceItemRequestAction,
  CreateInvoiceItemResponseAction,
  CreateInvoiceItemErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CreateInvoiceItemParams, InvoiceItemDetails } from '../models'

export default (
  params: CreateInvoiceItemParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreateInvoiceItemRequestAction
        | CreateInvoiceItemResponseAction
        | CreateInvoiceItemErrorAction,
    ) => void,
  ) => {
    const request = new CreateInvoiceItemRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<InvoiceItemDetails>('/billing/invoice-item/create', params)
      .then((response) => {
        dispatch(new CreateInvoiceItemResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateInvoiceItemErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

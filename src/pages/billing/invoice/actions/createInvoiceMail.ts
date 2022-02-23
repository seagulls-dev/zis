import {
  CreateInvoiceMailRequestAction,
  CreateInvoiceMailResponseAction,
  CreateInvoiceMailErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import {CreateInvoiceMailParams, InvoiceMailDetail} from '../models'

export default (params: CreateInvoiceMailParams, cb?: (isSuccess: boolean) => void) => {
  return (dispatch: (args: CreateInvoiceMailRequestAction | CreateInvoiceMailResponseAction | CreateInvoiceMailErrorAction) => void) => {
    const request = new CreateInvoiceMailRequestAction(params)
    dispatch(request)

    protectedApiClient.post<InvoiceMailDetail>('/billing/invoice/create-mail', params)
      .then(response => {
        dispatch(new CreateInvoiceMailResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch(error => {
        dispatch(new CreateInvoiceMailErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

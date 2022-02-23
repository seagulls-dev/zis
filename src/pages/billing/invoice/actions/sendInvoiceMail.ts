import { SendInvoiceMailRequestAction, SendInvoiceMailResponseAction, SendInvoiceMailErrorAction } from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import {SendInvoiceMailParams, InvoiceSentMailDetail} from '../models'

export default (params: SendInvoiceMailParams, cb?: (isSuccess: boolean, sent) => void) => {
  return (dispatch: (args: SendInvoiceMailRequestAction | SendInvoiceMailResponseAction | SendInvoiceMailErrorAction) => void) => {
    const request = new SendInvoiceMailRequestAction(params)
    dispatch(request)

    protectedApiClient.post<InvoiceSentMailDetail>('/billing/invoice/send-mail',params)
      .then(response => {
        dispatch(new SendInvoiceMailResponseAction(request, response.data))
        cb && cb(true, response.data)
      })
      .catch(error => {
        dispatch(new SendInvoiceMailErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false, error)
      })
  }
}

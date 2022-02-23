import { GenerateInvoiceRequestAction, GenerateInvoiceResponseAction, GenerateInvoiceErrorAction } from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { InvoiceDetails, GenerateInvoiceParams } from '../models'


export default (params: GenerateInvoiceParams, cb?: (isSuccess: boolean) => void) => {
  return (dispatch: (args: GenerateInvoiceRequestAction | GenerateInvoiceResponseAction | GenerateInvoiceErrorAction) => void) => {
    const request = new GenerateInvoiceRequestAction(params)
    dispatch(request)

    protectedApiClient.post<InvoiceDetails>('/billing/invoice/generate',params)
      .then(response => {
        dispatch(new GenerateInvoiceResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch(error => {
        dispatch(new GenerateInvoiceErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })

  }
}

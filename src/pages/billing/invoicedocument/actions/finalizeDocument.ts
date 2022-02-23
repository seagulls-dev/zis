import { FinalizeDocumentRequestAction, FinalizeDocumentResponseAction, FinalizeDocumentErrorAction } from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import {FinalizeDocumentParams} from '../models'
import { InvoiceDetails } from '../../invoice/models'

export default (params: FinalizeDocumentParams, cb?: (isSuccess: boolean, document: InvoiceDetails) => void) => {
  return (
    dispatch: (args: FinalizeDocumentRequestAction | FinalizeDocumentResponseAction | FinalizeDocumentErrorAction) => void
  ) => {
    const request = new FinalizeDocumentRequestAction(params)
    dispatch(request)

    protectedApiClient.post<InvoiceDetails>('/billing/invoice/finalize',params)
      .then(response => {
        dispatch(new FinalizeDocumentResponseAction(request, response.data))
        cb && cb(true, response.data)
      })
      .catch(error => {
        dispatch(new FinalizeDocumentErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false, error)
      })
  }
}

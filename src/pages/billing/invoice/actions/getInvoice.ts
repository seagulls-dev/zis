import {
  GetInvoiceRequestAction,
  GetInvoiceResponseAction,
  GetInvoiceErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { InvoiceDetails } from '../models'

export default (
  id: number,
  onProgress?: (ProgressEvent: any) => void,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | GetInvoiceRequestAction
        | GetInvoiceResponseAction
        | GetInvoiceErrorAction,
    ) => void,
  ) => {
    const request = new GetInvoiceRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<InvoiceDetails>(`/billing/invoice/get?id=${id}`, {
        onDownloadProgress: onProgress,
      })
      .then((response) => {
        dispatch(new GetInvoiceResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetInvoiceErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

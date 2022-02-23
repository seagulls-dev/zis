import {
  GetInvoiceAttachmentRequestAction,
  GetInvoiceAttachmentResponseAction,
  GetInvoiceAttachmentErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { InvoiceAttachmentDetails } from '../models'

export default (
  id: number,
  onProgress?: (ProgressEvent: any) => void,
  cb?: (isSuccess: boolean, response) => void,
) => {
  return (
    dispatch: (
      arg:
        | GetInvoiceAttachmentRequestAction
        | GetInvoiceAttachmentResponseAction
        | GetInvoiceAttachmentErrorAction,
    ) => void,
  ) => {
    const request = new GetInvoiceAttachmentRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<InvoiceAttachmentDetails>(
        `/billing/invoice-attachment/get?id=${id}`,
        {
          onDownloadProgress: onProgress,
        },
      )
      .then((response) => {
        dispatch(new GetInvoiceAttachmentResponseAction(request, response.data))
        cb && cb(true, response)
      })
      .catch((error) => {
        dispatch(new GetInvoiceAttachmentErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false, error)
      })
  }
}

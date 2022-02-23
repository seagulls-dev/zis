import {
  CreateInvoiceAttachmentRequestAction,
  CreateInvoiceAttachmentResponseAction,
  CreateInvoiceAttachmentErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import {
  CreateInvoiceAttachmentParams,
  InvoiceAttachmentDetails,
} from '../models'

export default (
  params: CreateInvoiceAttachmentParams,
  cb?: (id: number, isSuccess: boolean) => void,
  onProgress?: (ProgressEvent: any) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreateInvoiceAttachmentRequestAction
        | CreateInvoiceAttachmentResponseAction
        | CreateInvoiceAttachmentErrorAction,
    ) => void,
  ) => {
    const request = new CreateInvoiceAttachmentRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<InvoiceAttachmentDetails>(
        '/billing/invoice-attachment/create',
        params,
        { onUploadProgress: onProgress },
      )
      .then((response) => {
        dispatch(
          new CreateInvoiceAttachmentResponseAction(request, response.data),
        )
        cb && cb(response.data.id, true)
      })
      .catch((error) => {
        dispatch(new CreateInvoiceAttachmentErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(0, false)
      })
  }
}

import {
  GetInvoicesRequestAction,
  GetInvoicesResponseAction,
  GetInvoicesErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { InvoiceDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetInvoicesRequestAction
        | GetInvoicesResponseAction
        | GetInvoicesErrorAction,
    ) => void,
  ) => {
    const request = new GetInvoicesRequestAction()
    dispatch(request)

    protectedApiClient
      .get<InvoiceDetails[]>('/billing/invoice/get-all')
      .then((response) => {
        dispatch(new GetInvoicesResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetInvoicesErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

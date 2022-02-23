import {
  DeleteBillVatSummaryRequestAction,
  DeleteBillVatSummaryResponseAction,
  DeleteBillVatSummaryErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteBillVatSummaryRequestAction
        | DeleteBillVatSummaryResponseAction
        | DeleteBillVatSummaryErrorAction,
    ) => void,
  ) => {
    const request = new DeleteBillVatSummaryRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/billing/bill-vat-summary/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeleteBillVatSummaryResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteBillVatSummaryErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

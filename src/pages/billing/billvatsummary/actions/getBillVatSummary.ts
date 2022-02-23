import {
  GetBillVatSummaryRequestAction,
  GetBillVatSummaryResponseAction,
  GetBillVatSummaryErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { BillVatSummaryDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetBillVatSummaryRequestAction
        | GetBillVatSummaryResponseAction
        | GetBillVatSummaryErrorAction,
    ) => void,
  ) => {
    const request = new GetBillVatSummaryRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<BillVatSummaryDetails[]>(`/billing/bill-vat-summary/get?id=${id}`)
      .then((response) => {
        dispatch(new GetBillVatSummaryResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetBillVatSummaryErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

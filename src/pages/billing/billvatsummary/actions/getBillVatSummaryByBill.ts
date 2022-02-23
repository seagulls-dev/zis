import {
  GetBillVatSummaryByBillRequestAction,
  GetBillVatSummaryByBillResponseAction,
  GetBillVatSummaryByBillErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { BillVatSummaryDetails } from '../models'

export default (bill_id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetBillVatSummaryByBillRequestAction
        | GetBillVatSummaryByBillResponseAction
        | GetBillVatSummaryByBillErrorAction,
    ) => void,
  ) => {
    const request = new GetBillVatSummaryByBillRequestAction(bill_id)
    dispatch(request)

    protectedApiClient
      .get<BillVatSummaryDetails[]>(
        `/billing/bill-vat-summary/get-by-bill?bill_id=${bill_id}`,
      )
      .then((response) => {
        dispatch(
          new GetBillVatSummaryByBillResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetBillVatSummaryByBillErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  UpdateBillVatSummaryRequestAction,
  UpdateBillVatSummaryResponseAction,
  UpdateBillVatSummaryErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { BillVatSummaryDetails } from '../models'

export default (
  params: BillVatSummaryDetails,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdateBillVatSummaryRequestAction
        | UpdateBillVatSummaryResponseAction
        | UpdateBillVatSummaryErrorAction,
    ) => void,
  ) => {
    const request = new UpdateBillVatSummaryRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<BillVatSummaryDetails>(`/billing/bill-vat-summary/update`, params)
      .then((response) => {
        dispatch(new UpdateBillVatSummaryResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateBillVatSummaryErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

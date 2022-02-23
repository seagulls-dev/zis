import {
  CreateBillVatSummaryRequestAction,
  CreateBillVatSummaryResponseAction,
  CreateBillVatSummaryErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { BillVatSummaryParams, BillVatSummaryDetails } from '../models'

export default (
  params: BillVatSummaryParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreateBillVatSummaryRequestAction
        | CreateBillVatSummaryResponseAction
        | CreateBillVatSummaryErrorAction,
    ) => void,
  ) => {
    const request = new CreateBillVatSummaryRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<BillVatSummaryDetails[]>('/billing/bill-vat-summary/create', params)
      .then((response) => {
        dispatch(new CreateBillVatSummaryResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateBillVatSummaryErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

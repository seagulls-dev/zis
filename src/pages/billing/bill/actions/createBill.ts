import {
  CreateBillRequestAction,
  CreateBillResponseAction,
  CreateBillErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { BillParams, BillDetails } from '../models'

export default (
  params: BillParams,
  cb?: (isSuccess: boolean, bill_id?: number) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreateBillRequestAction
        | CreateBillResponseAction
        | CreateBillErrorAction,
    ) => void,
  ) => {
    const request = new CreateBillRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<BillDetails>('/billing/bill/create', params)
      .then((response) => {
        dispatch(new CreateBillResponseAction(request, response.data))
        cb && cb(true, response.data.id)
      })
      .catch((error) => {
        dispatch(new CreateBillErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  UpdateBillRequestAction,
  UpdateBillResponseAction,
  UpdateBillErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { BillDetails } from '../models'

export default (params: BillDetails, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | UpdateBillRequestAction
        | UpdateBillResponseAction
        | UpdateBillErrorAction,
    ) => void,
  ) => {
    const request = new UpdateBillRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<BillDetails>(`/billing/bill/update`, params)
      .then((response) => {
        dispatch(new UpdateBillResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateBillErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  GetBillRequestAction,
  GetBillResponseAction,
  GetBillErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { BillDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg: GetBillRequestAction | GetBillResponseAction | GetBillErrorAction,
    ) => void,
  ) => {
    const request = new GetBillRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<BillDetails>(`/billing/bill/get-by-company?company_id=${id}`)
      .then((response) => {
        dispatch(new GetBillResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetBillErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

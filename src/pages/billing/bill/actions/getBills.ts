import {
  GetBillsRequestAction,
  GetBillsResponseAction,
  GetBillsErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { BillDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg: GetBillsRequestAction | GetBillsResponseAction | GetBillsErrorAction,
    ) => void,
  ) => {
    const request = new GetBillsRequestAction()
    dispatch(request)

    protectedApiClient
      .get<BillDetails[]>('/billing/bill/get-all')
      .then((response) => {
        dispatch(new GetBillsResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetBillsErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

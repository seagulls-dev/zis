import {
  GetBillCostAllocationsRequestAction,
  GetBillCostAllocationsResponseAction,
  GetBillCostAllocationsErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { BillCostAllocationDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetBillCostAllocationsRequestAction
        | GetBillCostAllocationsResponseAction
        | GetBillCostAllocationsErrorAction,
    ) => void,
  ) => {
    const request = new GetBillCostAllocationsRequestAction()
    dispatch(request)

    protectedApiClient
      .get<BillCostAllocationDetails[]>('/billing/bill-cost-allocation/get-all')
      .then((response) => {
        dispatch(
          new GetBillCostAllocationsResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetBillCostAllocationsErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

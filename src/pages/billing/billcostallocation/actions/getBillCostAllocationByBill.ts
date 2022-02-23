import {
  GetBillCostAllocationByBillRequestAction,
  GetBillCostAllocationByBillResponseAction,
  GetBillCostAllocationByBillErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiError } from 'helpers/errorHandling'
import { BillCostAllocationDetails } from '../models'

export default (bill_id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetBillCostAllocationByBillRequestAction
        | GetBillCostAllocationByBillResponseAction
        | GetBillCostAllocationByBillErrorAction,
    ) => void,
  ) => {
    const request = new GetBillCostAllocationByBillRequestAction(bill_id)
    dispatch(request)

    protectedApiClient
      .get<BillCostAllocationDetails[]>(
        `/billing/bill-cost-allocation/get-by-bill?bill_id=${bill_id}`,
      )
      .then((response) => {
        dispatch(
          new GetBillCostAllocationByBillResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetBillCostAllocationByBillErrorAction(request, error))
        handleApiError(error)
        cb && cb(false)
      })
  }
}

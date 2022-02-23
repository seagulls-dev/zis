import {
  GetBillCostAllocationByCategoryRequestAction,
  GetBillCostAllocationByCategoryResponseAction,
  GetBillCostAllocationByCategoryErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { BillCostAllocationDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetBillCostAllocationByCategoryRequestAction
        | GetBillCostAllocationByCategoryResponseAction
        | GetBillCostAllocationByCategoryErrorAction,
    ) => void,
  ) => {
    const request = new GetBillCostAllocationByCategoryRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<BillCostAllocationDetails[]>(
        `/billing/bill-cost-allocation/get-by-cost-allocation-category?cost_allocation_category_id=${id}`,
      )
      .then((response) => {
        dispatch(
          new GetBillCostAllocationByCategoryResponseAction(
            request,
            response.data,
          ),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetBillCostAllocationByCategoryErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

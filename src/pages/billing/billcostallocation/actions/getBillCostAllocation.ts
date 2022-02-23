import {
  GetBillCostAllocationRequestAction,
  GetBillCostAllocationResponseAction,
  GetBillCostAllocationErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiError } from 'helpers/errorHandling'
import { BillCostAllocationDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetBillCostAllocationRequestAction
        | GetBillCostAllocationResponseAction
        | GetBillCostAllocationErrorAction,
    ) => void,
  ) => {
    const request = new GetBillCostAllocationRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<BillCostAllocationDetails>(
        `/billing/bill-cost-allocation/get?id=${id}`,
      )
      .then((response) => {
        dispatch(
          new GetBillCostAllocationResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetBillCostAllocationErrorAction(request, error))
        handleApiError(error)
        cb && cb(false)
      })
  }
}

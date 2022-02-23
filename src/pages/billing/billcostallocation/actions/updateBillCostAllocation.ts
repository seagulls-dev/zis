import {
  UpdateBillCostAllocationRequestAction,
  UpdateBillCostAllocationResponseAction,
  UpdateBillCostAllocationErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { BillCostAllocationDetails } from '../models'

export default (
  params: BillCostAllocationDetails,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdateBillCostAllocationRequestAction
        | UpdateBillCostAllocationResponseAction
        | UpdateBillCostAllocationErrorAction,
    ) => void,
  ) => {
    const request = new UpdateBillCostAllocationRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<BillCostAllocationDetails>(
        `/billing/bill-cost-allocation/update`,
        params,
      )
      .then((response) => {
        dispatch(
          new UpdateBillCostAllocationResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateBillCostAllocationErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

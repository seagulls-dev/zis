import {
  DeleteBillCostAllocationRequestAction,
  DeleteBillCostAllocationResponseAction,
  DeleteBillCostAllocationErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteBillCostAllocationRequestAction
        | DeleteBillCostAllocationResponseAction
        | DeleteBillCostAllocationErrorAction,
    ) => void,
  ) => {
    const request = new DeleteBillCostAllocationRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/billing/bill-cost-allocation/delete?id=${id}`)
      .then((response) => {
        dispatch(
          new DeleteBillCostAllocationResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteBillCostAllocationErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

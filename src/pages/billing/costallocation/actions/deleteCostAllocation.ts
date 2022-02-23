import {
  DeleteCostAllocationRequestAction,
  DeleteCostAllocationResponseAction,
  DeleteCostAllocationErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteCostAllocationRequestAction
        | DeleteCostAllocationResponseAction
        | DeleteCostAllocationErrorAction,
    ) => void,
  ) => {
    const request = new DeleteCostAllocationRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/billing/cost-allocation-category/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeleteCostAllocationResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteCostAllocationErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

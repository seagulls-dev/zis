import {
  GetCostAllocationRequestAction,
  GetCostAllocationResponseAction,
  GetCostAllocationErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CostAllocationDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetCostAllocationRequestAction
        | GetCostAllocationResponseAction
        | GetCostAllocationErrorAction,
    ) => void,
  ) => {
    const request = new GetCostAllocationRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<CostAllocationDetails>(
        `/billing/cost-allocation-category/get?id=${id}`,
      )
      .then((response) => {
        dispatch(new GetCostAllocationResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetCostAllocationErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

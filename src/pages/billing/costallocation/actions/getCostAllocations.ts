import {
  GetCostAllocationsRequestAction,
  GetCostAllocationsResponseAction,
  GetCostAllocationsErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CostAllocationDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetCostAllocationsRequestAction
        | GetCostAllocationsResponseAction
        | GetCostAllocationsErrorAction,
    ) => void,
  ) => {
    const request = new GetCostAllocationsRequestAction()
    dispatch(request)

    protectedApiClient
      .get<CostAllocationDetails[]>('/billing/cost-allocation-category/get-all')
      .then((response) => {
        dispatch(new GetCostAllocationsResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetCostAllocationsErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  UpdateCostAllocationRequestAction,
  UpdateCostAllocationResponseAction,
  UpdateCostAllocationErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { UpdateCostAllocationParams, CostAllocationDetails } from '../models'

export default (
  params: UpdateCostAllocationParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdateCostAllocationRequestAction
        | UpdateCostAllocationResponseAction
        | UpdateCostAllocationErrorAction,
    ) => void,
  ) => {
    const request = new UpdateCostAllocationRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<CostAllocationDetails>(
        `/billing/cost-allocation-category/update`,
        params,
      )
      .then((response) => {
        dispatch(new UpdateCostAllocationResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateCostAllocationErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

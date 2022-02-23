import {
  CreateCostAllocationRequestAction,
  CreateCostAllocationResponseAction,
  CreateCostAllocationErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CreateCostAllocationParams, CostAllocationDetails } from '../models'

export default (
  params: CreateCostAllocationParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreateCostAllocationRequestAction
        | CreateCostAllocationResponseAction
        | CreateCostAllocationErrorAction,
    ) => void,
  ) => {
    const request = new CreateCostAllocationRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<CostAllocationDetails>(
        '/billing/cost-allocation-category/create',
        params,
      )
      .then((response) => {
        dispatch(new CreateCostAllocationResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateCostAllocationErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

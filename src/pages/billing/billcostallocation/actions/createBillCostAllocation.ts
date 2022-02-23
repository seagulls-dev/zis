import {
  CreateBillCostAllocationRequestAction,
  CreateBillCostAllocationResponseAction,
  CreateBillCostAllocationErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { BillCostAllocationParams, BillCostAllocationDetails } from '../models'

export default (
  params: BillCostAllocationParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreateBillCostAllocationRequestAction
        | CreateBillCostAllocationResponseAction
        | CreateBillCostAllocationErrorAction,
    ) => void,
  ) => {
    const request = new CreateBillCostAllocationRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<BillCostAllocationDetails>(
        '/billing/bill-cost-allocation/create',
        params,
      )
      .then((response) => {
        dispatch(
          new CreateBillCostAllocationResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateBillCostAllocationErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

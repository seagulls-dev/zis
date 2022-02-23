import {
  CreateInventoryRequestAction,
  CreateInventoryResponseAction,
  CreateInventoryErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CreateInventoryParams, InventoryDetails } from '../models'

export default (
  params: CreateInventoryParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreateInventoryRequestAction
        | CreateInventoryResponseAction
        | CreateInventoryErrorAction,
    ) => void,
  ) => {
    const request = new CreateInventoryRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<InventoryDetails>('/inventory/inventory/create', params)
      .then((response) => {
        dispatch(new CreateInventoryResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateInventoryErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

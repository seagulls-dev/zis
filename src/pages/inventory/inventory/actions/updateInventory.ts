import {
  UpdateInventoryRequestAction,
  UpdateInventoryResponseAction,
  UpdateInventoryErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { InventoryDetails } from '../models'

export default (
  params: InventoryDetails,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdateInventoryRequestAction
        | UpdateInventoryResponseAction
        | UpdateInventoryErrorAction,
    ) => void,
  ) => {
    const request = new UpdateInventoryRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<InventoryDetails>(`/inventory/inventory/update`, params)
      .then((response) => {
        dispatch(new UpdateInventoryResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateInventoryErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

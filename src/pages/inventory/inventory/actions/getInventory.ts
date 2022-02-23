import {
  GetInventoryRequestAction,
  GetInventoryResponseAction,
  GetInventoryErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { InventoryDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetInventoryRequestAction
        | GetInventoryResponseAction
        | GetInventoryErrorAction,
    ) => void,
  ) => {
    const request = new GetInventoryRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<InventoryDetails>(`/inventory/inventory/get?id=${id}`)
      .then((response) => {
        dispatch(new GetInventoryResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetInventoryErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  GetInventoriesRequestAction,
  GetInventoriesResponseAction,
  GetInventoriesErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { InventoryDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetInventoriesRequestAction
        | GetInventoriesResponseAction
        | GetInventoriesErrorAction,
    ) => void,
  ) => {
    const request = new GetInventoriesRequestAction()
    dispatch(request)

    protectedApiClient
      .get<InventoryDetails[]>('/inventory/inventory/get-all')
      .then((response) => {
        dispatch(new GetInventoriesResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetInventoriesErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

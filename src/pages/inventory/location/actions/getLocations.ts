import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import {
  GetInventoryLocationsRequestAction,
  GetInventoryLocationsResponseAction,
  GetInventoryLocationsErrorAction,
} from '.'
import { InventoryLocationDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetInventoryLocationsRequestAction
        | GetInventoryLocationsResponseAction
        | GetInventoryLocationsErrorAction,
    ) => void,
  ) => {
    const request = new GetInventoryLocationsRequestAction()
    dispatch(request)

    protectedApiClient
      .get<InventoryLocationDetails[]>('/inventory/location/get-all')
      .then((response) => {
        dispatch(
          new GetInventoryLocationsResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetInventoryLocationsErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

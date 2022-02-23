import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import {
  GetInventoryTypesRequestAction,
  GetInventoryTypesResponseAction,
  GetInventoryTypesErrorAction,
} from '.'
import { InventoryTypeDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetInventoryTypesRequestAction
        | GetInventoryTypesResponseAction
        | GetInventoryTypesErrorAction,
    ) => void,
  ) => {
    const request = new GetInventoryTypesRequestAction()
    dispatch(request)

    protectedApiClient
      .get<InventoryTypeDetails[]>('/inventory/inventory-type/get-all')
      .then((response) => {
        dispatch(new GetInventoryTypesResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetInventoryTypesErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  SwapComponentToPhysicalServerRequestAction,
  SwapComponentToPhysicalServerResponseAction,
  SwapComponentToPhysicalServerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { PhysicalServerSwapComponentParams } from '../models'
import { InventoryDetails } from 'pages/inventory/inventory/models'

export default (
  params: PhysicalServerSwapComponentParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | SwapComponentToPhysicalServerRequestAction
        | SwapComponentToPhysicalServerResponseAction
        | SwapComponentToPhysicalServerErrorAction,
    ) => void,
  ) => {
    const request = new SwapComponentToPhysicalServerRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<InventoryDetails>(
        `/inventory/physical-server/swap-component`,
        params,
      )
      .then((response) => {
        dispatch(
          new SwapComponentToPhysicalServerResponseAction(
            request,
            response.data,
          ),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new SwapComponentToPhysicalServerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

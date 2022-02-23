import {
  RemoveComponentFromPhysicalServerRequestAction,
  RemoveComponentFromPhysicalServerResponseAction,
  RemoveComponentFromPhysicalServerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { PhysicalServerRemoveComponentParams } from '../models'
import { serializeParams } from 'helpers/stringHelpers'

export default (
  params: PhysicalServerRemoveComponentParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | RemoveComponentFromPhysicalServerRequestAction
        | RemoveComponentFromPhysicalServerResponseAction
        | RemoveComponentFromPhysicalServerErrorAction,
    ) => void,
  ) => {
    const request = new RemoveComponentFromPhysicalServerRequestAction(params)
    dispatch(request)
    const serializedParams = serializeParams(params)
    protectedApiClient
      .delete(`/inventory/physical-server/remove-component?${serializedParams}`)
      .then((response) => {
        dispatch(
          new RemoveComponentFromPhysicalServerResponseAction(
            request,
            response.data,
          ),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(
          new RemoveComponentFromPhysicalServerErrorAction(request, error),
        )
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

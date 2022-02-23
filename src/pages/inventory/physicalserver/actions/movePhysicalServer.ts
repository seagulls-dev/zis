import {
  MovePhysicalServerRequestAction,
  MovePhysicalServerResponseAction,
  MovePhysicalServerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { MovePhysicalServerParams } from '../models'
import { serializeParams } from 'helpers/stringHelpers'

export default (
  params: MovePhysicalServerParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | MovePhysicalServerRequestAction
        | MovePhysicalServerResponseAction
        | MovePhysicalServerErrorAction,
    ) => void,
  ) => {
    const request = new MovePhysicalServerRequestAction(params)
    dispatch(request)
    const serializedParams = serializeParams(params)
    protectedApiClient
      .delete(`/inventory/physical-server/remove-server?${serializedParams}`)
      .then((response) => {
        dispatch(new MovePhysicalServerResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new MovePhysicalServerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

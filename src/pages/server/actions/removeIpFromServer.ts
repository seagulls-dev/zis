import {
  RemoveIpFromServerRequestAction,
  RemoveIpFromServerResponseAction,
  RemoveIpFromServerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { ServerDetails, ServerAddRemoveIpParams } from '../models'

export default (
  params: ServerAddRemoveIpParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | RemoveIpFromServerRequestAction
        | RemoveIpFromServerResponseAction
        | RemoveIpFromServerErrorAction,
    ) => void,
  ) => {
    const request = new RemoveIpFromServerRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<ServerDetails>('/server/server/remove-ip', params)
      .then((response) => {
        dispatch(new RemoveIpFromServerResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new RemoveIpFromServerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

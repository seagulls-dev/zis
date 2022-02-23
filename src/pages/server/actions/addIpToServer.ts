import {
  AddIpToServerRequestAction,
  AddIpToServerResponseAction,
  AddIpToServerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { ServerAddRemoveIpParams, AddRemoveIpResponse } from '../models'

export default (
  params: ServerAddRemoveIpParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | AddIpToServerRequestAction
        | AddIpToServerResponseAction
        | AddIpToServerErrorAction,
    ) => void,
  ) => {
    const request = new AddIpToServerRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<AddRemoveIpResponse>('/server/server/add-ip', params)
      .then((response) => {
        dispatch(new AddIpToServerResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new AddIpToServerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

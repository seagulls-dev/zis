import {
  UpdateServerRequestAction,
  UpdateServerResponseAction,
  UpdateServerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CreateUpdateServerParams } from '../models'
import { ServerDetails } from '../models'

export default (
  params: CreateUpdateServerParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdateServerRequestAction
        | UpdateServerResponseAction
        | UpdateServerErrorAction,
    ) => void,
  ) => {
    const request = new UpdateServerRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<ServerDetails>(`/server/server/update`, params)
      .then((response) => {
        dispatch(new UpdateServerResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateServerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

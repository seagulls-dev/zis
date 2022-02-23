import {
  CreateServerRequestAction,
  CreateServerResponseAction,
  CreateServerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CreateUpdateServerParams, ServerDetails } from '../models'

export default (
  params: CreateUpdateServerParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreateServerRequestAction
        | CreateServerResponseAction
        | CreateServerErrorAction,
    ) => void,
  ) => {
    const request = new CreateServerRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<ServerDetails>('/server/server/create', params)
      .then((response) => {
        dispatch(new CreateServerResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateServerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

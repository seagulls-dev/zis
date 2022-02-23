import {
  GetServerRequestAction,
  GetServerResponseAction,
  GetServerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { ServerDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetServerRequestAction
        | GetServerResponseAction
        | GetServerErrorAction,
    ) => void,
  ) => {
    const request = new GetServerRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<ServerDetails>(`/server/server/get?id=${id}`)
      .then((response) => {
        dispatch(new GetServerResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetServerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

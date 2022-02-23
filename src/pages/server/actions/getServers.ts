import {
  GetServersRequestAction,
  GetServersResponseAction,
  GetServersErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { ServerDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetServersRequestAction
        | GetServersResponseAction
        | GetServersErrorAction,
    ) => void,
  ) => {
    const request = new GetServersRequestAction()
    dispatch(request)

    protectedApiClient
      .get<ServerDetails[]>('/server/server/get-all')
      .then((response) => {
        dispatch(new GetServersResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetServersErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

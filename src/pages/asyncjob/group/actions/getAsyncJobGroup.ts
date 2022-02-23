import {
  GetAsyncJobGroupRequestAction,
  GetAsyncJobGroupResponseAction,
  GetAsyncJobGroupErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { AsyncJobGroupDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetAsyncJobGroupRequestAction
        | GetAsyncJobGroupResponseAction
        | GetAsyncJobGroupErrorAction
    ) => void
  ) => {
    const request = new GetAsyncJobGroupRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<AsyncJobGroupDetails>(`/asyncjob/group/get?id=${id}`)
      .then((response) => {
        dispatch(new GetAsyncJobGroupResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetAsyncJobGroupErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  GetAsyncJobGroupsRequestAction,
  GetAsyncJobGroupsResponseAction,
  GetAsyncJobGroupsErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { AsyncJobGroupDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetAsyncJobGroupsRequestAction
        | GetAsyncJobGroupsResponseAction
        | GetAsyncJobGroupsErrorAction
    ) => void
  ) => {
    const request = new GetAsyncJobGroupsRequestAction()
    dispatch(request)

    protectedApiClient
      .get<AsyncJobGroupDetails[]>('/asyncjob/group/get-all')
      .then((response) => {
        dispatch(new GetAsyncJobGroupsResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetAsyncJobGroupsErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

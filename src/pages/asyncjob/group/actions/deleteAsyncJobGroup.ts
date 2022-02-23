import {
  DeleteAsyncJobGroupRequestAction,
  DeleteAsyncJobGroupResponseAction,
  DeleteAsyncJobGroupErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteAsyncJobGroupRequestAction
        | DeleteAsyncJobGroupResponseAction
        | DeleteAsyncJobGroupErrorAction
    ) => void
  ) => {
    const request = new DeleteAsyncJobGroupRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/asyncjob/group/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeleteAsyncJobGroupResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteAsyncJobGroupErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

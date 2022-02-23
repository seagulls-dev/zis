import {
  DeleteBlockRequestAction,
  DeleteBlockResponseAction,
  DeleteBlockErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteBlockRequestAction
        | DeleteBlockResponseAction
        | DeleteBlockErrorAction,
    ) => void,
  ) => {
    const request = new DeleteBlockRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/datacenter/block/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeleteBlockResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteBlockErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

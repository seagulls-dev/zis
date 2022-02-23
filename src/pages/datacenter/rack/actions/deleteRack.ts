import {
  DeleteRackRequestAction,
  DeleteRackResponseAction,
  DeleteRackErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteRackRequestAction
        | DeleteRackResponseAction
        | DeleteRackErrorAction,
    ) => void,
  ) => {
    const request = new DeleteRackRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/datacenter/rack/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeleteRackResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteRackErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

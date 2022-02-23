import {
  DeleteIpRequestAction,
  DeleteIpResponseAction,
  DeleteIpErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg: DeleteIpRequestAction | DeleteIpResponseAction | DeleteIpErrorAction,
    ) => void,
  ) => {
    const request = new DeleteIpRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/ip/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeleteIpResponseAction(request, id))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteIpErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  DeleteSubnetIpRequestAction,
  DeleteSubnetIpResponseAction,
  DeleteSubnetIpErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteSubnetIpRequestAction
        | DeleteSubnetIpResponseAction
        | DeleteSubnetIpErrorAction,
    ) => void,
  ) => {
    const request = new DeleteSubnetIpRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/ip/subnet/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeleteSubnetIpResponseAction(request, id))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteSubnetIpErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  DeleteDnsServiceRequestAction,
  DeleteDnsServiceResponseAction,
  DeleteDnsServiceErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteDnsServiceRequestAction
        | DeleteDnsServiceResponseAction
        | DeleteDnsServiceErrorAction
    ) => void
  ) => {
    const request = new DeleteDnsServiceRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/dns/service/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeleteDnsServiceResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteDnsServiceErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

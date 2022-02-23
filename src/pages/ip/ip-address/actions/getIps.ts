import { ListIpRequestAction, ListIpResponseAction, ListIpErrorAction } from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { IpDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg: ListIpRequestAction | ListIpResponseAction | ListIpErrorAction,
    ) => void,
  ) => {
    const request = new ListIpRequestAction()
    dispatch(request)

    protectedApiClient
      .get<IpDetails[]>(`/ip/get-all`)
      .then((response) => {
        dispatch(new ListIpResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new ListIpErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

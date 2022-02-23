import { GetIpRequestAction, GetIpResponseAction, GetIpErrorAction } from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { IpDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg: GetIpRequestAction | GetIpResponseAction | GetIpErrorAction,
    ) => void,
  ) => {
    const request = new GetIpRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<IpDetails>(`/ip/get?id=${id}`)
      .then((response) => {
        dispatch(new GetIpResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetIpErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

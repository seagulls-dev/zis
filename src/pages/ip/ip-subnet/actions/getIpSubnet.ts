import {
  GetSubnetIpRequestAction,
  GetSubnetIpResponseAction,
  GetSubnetIpErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { IpSubnetDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetSubnetIpRequestAction
        | GetSubnetIpResponseAction
        | GetSubnetIpErrorAction,
    ) => void,
  ) => {
    const request = new GetSubnetIpRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<IpSubnetDetails>(`/ip/subnet/get?id=${id}`)
      .then((response) => {
        dispatch(new GetSubnetIpResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetSubnetIpErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

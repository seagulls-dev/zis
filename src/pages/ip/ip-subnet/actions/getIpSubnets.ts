import {
  ListSubnetIpRequestAction,
  ListSubnetIpResponseAction,
  ListSubnetIpErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { IpSubnetDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | ListSubnetIpRequestAction
        | ListSubnetIpResponseAction
        | ListSubnetIpErrorAction,
    ) => void,
  ) => {
    const request = new ListSubnetIpRequestAction()
    dispatch(request)

    protectedApiClient
      .get<IpSubnetDetails[]>(`/ip/subnet/get-all`)
      .then((response) => {
        dispatch(new ListSubnetIpResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new ListSubnetIpErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

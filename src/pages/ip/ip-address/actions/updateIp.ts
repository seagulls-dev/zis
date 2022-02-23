import {
  UpdateIpRequestAction,
  UpdateIpResponseAction,
  UpdateIpErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { UpdateIpParams, IpDetails } from '../models'

export default (params: UpdateIpParams, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg: UpdateIpRequestAction | UpdateIpResponseAction | UpdateIpErrorAction,
    ) => void,
  ) => {
    const request = new UpdateIpRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<IpDetails>('/ip/update', params)
      .then((response) => {
        dispatch(new UpdateIpResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateIpErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

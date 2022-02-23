import {
  UpdateSubnetIpRequestAction,
  UpdateSubnetIpResponseAction,
  UpdateSubnetIpErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { UpdateSubnetIpParams, IpSubnetDetails } from '../models'

export default (
  params: UpdateSubnetIpParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdateSubnetIpRequestAction
        | UpdateSubnetIpResponseAction
        | UpdateSubnetIpErrorAction,
    ) => void,
  ) => {
    const request = new UpdateSubnetIpRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<IpSubnetDetails>('/ip/subnet/update', params)
      .then((response) => {
        dispatch(new UpdateSubnetIpResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateSubnetIpErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

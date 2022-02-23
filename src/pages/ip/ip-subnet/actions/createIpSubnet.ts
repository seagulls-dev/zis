import {
  CreateSubnetIpRequestAction,
  CreateSubnetIpResponseAction,
  CreateSubnetIpErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { IpSubnetDetails, CreateSubnetIpParams } from '../models'

export default (
  params: CreateSubnetIpParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreateSubnetIpRequestAction
        | CreateSubnetIpResponseAction
        | CreateSubnetIpErrorAction,
    ) => void,
  ) => {
    const request = new CreateSubnetIpRequestAction(params)
    dispatch(request)

    protectedApiClient
      .post<IpSubnetDetails>('/ip/subnet/create', params)
      .then((response) => {
        dispatch(new CreateSubnetIpResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateSubnetIpErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

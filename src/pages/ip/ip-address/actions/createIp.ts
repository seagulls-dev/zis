import {
  CreateIpRequestAction,
  CreateIpResponseAction,
  CreateIpErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { IpDetails, CreateIpParams } from '../models'

export default (params: CreateIpParams, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg: CreateIpRequestAction | CreateIpResponseAction | CreateIpErrorAction,
    ) => void,
  ) => {
    const request = new CreateIpRequestAction(params)
    dispatch(request)

    protectedApiClient
      .post<IpDetails>('/ip/create', params)
      .then((response) => {
        dispatch(new CreateIpResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateIpErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

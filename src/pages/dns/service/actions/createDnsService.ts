import {
  CreateDnsServiceRequestAction,
  CreateDnsServiceResponseAction,
  CreateDnsServiceErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CreateDnsServiceParams, DnsServiceDetails } from '../models'

export default (params: CreateDnsServiceParams, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | CreateDnsServiceRequestAction
        | CreateDnsServiceResponseAction
        | CreateDnsServiceErrorAction,
    ) => void,
  ) => {
    const request = new CreateDnsServiceRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<DnsServiceDetails>('/dns/service/create', params)
      .then((response) => {
        dispatch(new CreateDnsServiceResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateDnsServiceErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

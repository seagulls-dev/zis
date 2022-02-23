import {
  UpdateDnsServiceRequestAction,
  UpdateDnsServiceResponseAction,
  UpdateDnsServiceErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { DnsServiceDetails } from '../models'

export default (params: DnsServiceDetails, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | UpdateDnsServiceRequestAction
        | UpdateDnsServiceResponseAction
        | UpdateDnsServiceErrorAction,
    ) => void,
  ) => {
    const request = new UpdateDnsServiceRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<DnsServiceDetails>(`/dns/service/update`, params)
      .then((response) => {
        dispatch(new UpdateDnsServiceResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateDnsServiceErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

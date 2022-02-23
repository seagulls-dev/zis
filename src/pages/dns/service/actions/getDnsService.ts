import { GetDnsServiceRequestAction, GetDnsServiceResponseAction, GetDnsServiceErrorAction } from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { DnsServiceDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg: GetDnsServiceRequestAction | GetDnsServiceResponseAction | GetDnsServiceErrorAction,
    ) => void,
  ) => {
    const request = new GetDnsServiceRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<DnsServiceDetails>(`/dns/service/get?id=${id}`)
      .then((response) => {
        dispatch(new GetDnsServiceResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetDnsServiceErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

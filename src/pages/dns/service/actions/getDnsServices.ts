import {
  GetDnsServicesRequestAction,
  GetDnsServicesResponseAction,
  GetDnsServicesErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { DnsServiceDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetDnsServicesRequestAction
        | GetDnsServicesResponseAction
        | GetDnsServicesErrorAction
    ) => void
  ) => {
    const request = new GetDnsServicesRequestAction()
    dispatch(request)

    protectedApiClient
      .get<DnsServiceDetails[]>('/dns/service/get-all')
      .then((response) => {
        dispatch(new GetDnsServicesResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetDnsServicesErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

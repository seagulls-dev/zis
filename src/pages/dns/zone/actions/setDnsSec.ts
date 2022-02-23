import {
  SetDnsSecDnsZoneRequestAction,
  SetDnsSecDnsZoneResponseAction,
  SetDnsSecDnsZoneErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { DnsZoneDetails, SetDnsSecDnsZoneParams } from '../models'

export default (
  params: SetDnsSecDnsZoneParams,
  cb?: (isSuccess: boolean) => void
) => {
  return (
    dispatch: (
      arg:
        | SetDnsSecDnsZoneRequestAction
        | SetDnsSecDnsZoneResponseAction
        | SetDnsSecDnsZoneErrorAction
    ) => void
  ) => {
    const request = new SetDnsSecDnsZoneRequestAction(params)
    dispatch(request)
    protectedApiClient
      .put<DnsZoneDetails>(`/dns/zone/set-dnssec`, params)
      .then((response) => {
        dispatch(new SetDnsSecDnsZoneResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new SetDnsSecDnsZoneErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

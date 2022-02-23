import {
  SetSoaTtlDnsZoneRequestAction,
  SetSoaTtlDnsZoneResponseAction,
  SetSoaTtlDnsZoneErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { DnsZoneDetails, SetSoaTtlDnsZoneParams } from '../models'

export default (
  params: SetSoaTtlDnsZoneParams,
  cb?: (isSuccess: boolean) => void
) => {
  return (
    dispatch: (
      arg:
        | SetSoaTtlDnsZoneRequestAction
        | SetSoaTtlDnsZoneResponseAction
        | SetSoaTtlDnsZoneErrorAction
    ) => void
  ) => {
    const request = new SetSoaTtlDnsZoneRequestAction(params)
    dispatch(request)
    protectedApiClient
      .put<DnsZoneDetails>(`/dns/zone/set-soa-ttl`, params)
      .then((response) => {
        dispatch(new SetSoaTtlDnsZoneResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new SetSoaTtlDnsZoneErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

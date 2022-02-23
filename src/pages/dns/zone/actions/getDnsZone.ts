import {
  GetDnsZoneRequestAction,
  GetDnsZoneResponseAction,
  GetDnsZoneErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { DnsZoneDetails, GetZoneParams } from '../models'
import { serializeParams } from 'helpers/stringHelpers'

export default (params: GetZoneParams, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetDnsZoneRequestAction
        | GetDnsZoneResponseAction
        | GetDnsZoneErrorAction
    ) => void
  ) => {
    const request = new GetDnsZoneRequestAction(params)
    dispatch(request)
    const serializedParams = serializeParams(params)
    protectedApiClient
      .get<DnsZoneDetails>(`/dns/zone/get?${serializedParams}`)
      .then((response) => {
        dispatch(new GetDnsZoneResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetDnsZoneErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

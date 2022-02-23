import {
  GetArchivedDnsZoneRequestAction,
  GetArchivedDnsZoneResponseAction,
  GetArchivedDnsZoneErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiError } from 'helpers/errorHandling'
import { DnsZoneDetails, GetZoneParams } from '../models'
import { serializeParams } from 'helpers/stringHelpers'

export default (params: GetZoneParams, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetArchivedDnsZoneRequestAction
        | GetArchivedDnsZoneResponseAction
        | GetArchivedDnsZoneErrorAction
    ) => void
  ) => {
    const request = new GetArchivedDnsZoneRequestAction(params)
    dispatch(request)
    const serializedParams = serializeParams(params)
    protectedApiClient
      .get<DnsZoneDetails>(`/dns/zone/archived?${serializedParams}`)
      .then((response) => {
        dispatch(new GetArchivedDnsZoneResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetArchivedDnsZoneErrorAction(request, error))
        handleApiError(error)
        cb && cb(false)
      })
  }
}

import {
  GetDnsZonesRequestAction,
  GetDnsZonesResponseAction,
  GetDnsZonesErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { GetAllZonesParams, DnsZone } from '../models'
import { serializeParams } from 'helpers/stringHelpers'

export default (
  params: GetAllZonesParams,
  cb?: (isSuccess: boolean) => void
) => {
  return (
    dispatch: (
      arg:
        | GetDnsZonesRequestAction
        | GetDnsZonesResponseAction
        | GetDnsZonesErrorAction
    ) => void
  ) => {
    const request = new GetDnsZonesRequestAction(params)
    dispatch(request)
    const serializedParams = serializeParams(params)
    protectedApiClient
      .get<DnsZone[]>(`/dns/zone/get-all?${serializedParams}`)
      .then((response) => {
        dispatch(new GetDnsZonesResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetDnsZonesErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

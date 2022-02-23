import { protectedApiClient } from 'helpers/api'
import { serializeParams } from 'helpers/stringHelpers'
import { ExportDnsZoneParams } from '../models'

export default (params: ExportDnsZoneParams) => {
  const serializedParams = serializeParams(params)
  return protectedApiClient
    .post<string>(`/dns/zone/export?${serializedParams}`)
    .then((response) => response)
    .catch((error) => error)
}

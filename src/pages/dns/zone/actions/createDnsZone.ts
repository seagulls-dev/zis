import {
  CreateDnsZoneRequestAction,
  CreateDnsZoneResponseAction,
  CreateDnsZoneErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CreateDnsZoneParams, DnsZone } from '../models'

export default (
  params: CreateDnsZoneParams,
  cb?: (isSuccess: boolean) => void
) => {
  return (
    dispatch: (
      arg:
        | CreateDnsZoneRequestAction
        | CreateDnsZoneResponseAction
        | CreateDnsZoneErrorAction
    ) => void
  ) => {
    const request = new CreateDnsZoneRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<DnsZone[]>('/dns/zone/create', params)
      .then((response) => {
        dispatch(new CreateDnsZoneResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateDnsZoneErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  DeleteDnsZoneRequestAction,
  DeleteDnsZoneResponseAction,
  DeleteDnsZoneErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { DeleteDnsZoneParams } from '../models'
import { serializeParams } from 'helpers/stringHelpers'

export default (
  params: DeleteDnsZoneParams,
  cb?: (isSuccess: boolean) => void
) => {
  return (
    dispatch: (
      arg:
        | DeleteDnsZoneRequestAction
        | DeleteDnsZoneResponseAction
        | DeleteDnsZoneErrorAction
    ) => void
  ) => {
    const request = new DeleteDnsZoneRequestAction(params)
    dispatch(request)
    const serializedParams = serializeParams(params)
    protectedApiClient
      .delete(`/dns/zone/delete?${serializedParams}`)
      .then((response) => {
        dispatch(new DeleteDnsZoneResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteDnsZoneErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

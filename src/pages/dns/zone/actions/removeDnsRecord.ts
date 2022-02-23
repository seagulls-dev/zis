import {
  RemoveDnsRecordRequestAction,
  RemoveDnsRecordResponseAction,
  RemoveDnsRecordErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { DnsZoneDetails, RemoveDnsRecordParams } from '../models'

export default (
  params: RemoveDnsRecordParams,
  cb?: (isSuccess: boolean) => void
) => {
  return (
    dispatch: (
      arg:
        | RemoveDnsRecordRequestAction
        | RemoveDnsRecordResponseAction
        | RemoveDnsRecordErrorAction
    ) => void
  ) => {
    const request = new RemoveDnsRecordRequestAction(params)
    dispatch(request)
    protectedApiClient
      .put<DnsZoneDetails>(`/dns/zone/remove-record`, params)
      .then((response) => {
        dispatch(new RemoveDnsRecordResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new RemoveDnsRecordErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  AddDnsRecordRequestAction,
  AddDnsRecordResponseAction,
  AddDnsRecordErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { AddDnsRecordParams, DnsZoneDetails } from '../models'

export default (
  params: AddDnsRecordParams,
  cb?: (isSuccess: boolean) => void
) => {
  return (
    dispatch: (
      arg:
        | AddDnsRecordRequestAction
        | AddDnsRecordResponseAction
        | AddDnsRecordErrorAction
    ) => void
  ) => {
    const request = new AddDnsRecordRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<DnsZoneDetails>('/dns/zone/add-record', params)
      .then((response) => {
        dispatch(new AddDnsRecordResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new AddDnsRecordErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

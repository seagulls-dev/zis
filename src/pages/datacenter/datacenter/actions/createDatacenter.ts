import {
  CreateDataCenterRequestAction,
  CreateDataCenterResponseAction,
  CreateDataCenterErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CreateDataCenterParams, DataCenterDetails } from '../models'

export default (
  params: CreateDataCenterParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreateDataCenterRequestAction
        | CreateDataCenterResponseAction
        | CreateDataCenterErrorAction,
    ) => void,
  ) => {
    const request = new CreateDataCenterRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<DataCenterDetails>('/datacenter/datacenter/create', params)
      .then((response) => {
        dispatch(new CreateDataCenterResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateDataCenterErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

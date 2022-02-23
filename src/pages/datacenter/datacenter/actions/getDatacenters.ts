import {
  GetDataCentersRequestAction,
  GetDataCentersResponseAction,
  GetDataCentersErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { DataCenterDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetDataCentersRequestAction
        | GetDataCentersResponseAction
        | GetDataCentersErrorAction,
    ) => void,
  ) => {
    const request = new GetDataCentersRequestAction()
    dispatch(request)

    protectedApiClient
      .get<DataCenterDetails[]>('/datacenter/datacenter/get-all')
      .then((response) => {
        dispatch(new GetDataCentersResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetDataCentersErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

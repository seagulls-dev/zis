import {
  UpdateDataCenterRequestAction,
  UpdateDataCenterResponseAction,
  UpdateDataCenterErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { DataCenterDetails } from '../models'

export default (
  params: DataCenterDetails,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdateDataCenterRequestAction
        | UpdateDataCenterResponseAction
        | UpdateDataCenterErrorAction,
    ) => void,
  ) => {
    const request = new UpdateDataCenterRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<DataCenterDetails>(`/datacenter/datacenter/update`, params)
      .then((response) => {
        dispatch(new UpdateDataCenterResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateDataCenterErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

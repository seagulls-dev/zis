import {
  GetDataCenterRequestAction,
  GetDataCenterResponseAction,
  GetDataCenterErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { DataCenterDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetDataCenterRequestAction
        | GetDataCenterResponseAction
        | GetDataCenterErrorAction,
    ) => void,
  ) => {
    const request = new GetDataCenterRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<DataCenterDetails>(`/datacenter/datacenter/get?id=${id}`)
      .then((response) => {
        dispatch(new GetDataCenterResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetDataCenterErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  GetRackRequestAction,
  GetRackResponseAction,
  GetRackErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { RackDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg: GetRackRequestAction | GetRackResponseAction | GetRackErrorAction,
    ) => void,
  ) => {
    const request = new GetRackRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<RackDetails>(`/datacenter/rack/get?id=${id}`)
      .then((response) => {
        dispatch(new GetRackResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetRackErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

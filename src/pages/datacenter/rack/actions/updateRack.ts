import {
  UpdateRackRequestAction,
  UpdateRackResponseAction,
  UpdateRackErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { RackDetails } from '../models'

export default (params: RackDetails, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | UpdateRackRequestAction
        | UpdateRackResponseAction
        | UpdateRackErrorAction,
    ) => void,
  ) => {
    const request = new UpdateRackRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<RackDetails>(`/datacenter/rack/update`, params)
      .then((response) => {
        dispatch(new UpdateRackResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateRackErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

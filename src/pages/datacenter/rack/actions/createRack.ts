import {
  CreateRackRequestAction,
  CreateRackResponseAction,
  CreateRackErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { RackParams, RackDetails } from '../models'

export default (params: RackParams, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | CreateRackRequestAction
        | CreateRackResponseAction
        | CreateRackErrorAction,
    ) => void,
  ) => {
    const request = new CreateRackRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<RackDetails>('/datacenter/rack/create', params)
      .then((response) => {
        dispatch(new CreateRackResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateRackErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

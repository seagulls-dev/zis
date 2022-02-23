import {
  CreatePhysicalServerRequestAction,
  CreatePhysicalServerResponseAction,
  CreatePhysicalServerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CreatePhysicalServerParams, PhysicalServerDetails } from '../models'

export default (
  params: CreatePhysicalServerParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreatePhysicalServerRequestAction
        | CreatePhysicalServerResponseAction
        | CreatePhysicalServerErrorAction,
    ) => void,
  ) => {
    const request = new CreatePhysicalServerRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<PhysicalServerDetails>('/inventory/physical-server/create', params)
      .then((response) => {
        dispatch(new CreatePhysicalServerResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreatePhysicalServerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

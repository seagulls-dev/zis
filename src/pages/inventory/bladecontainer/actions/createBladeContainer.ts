import {
  CreateBladeContainerRequestAction,
  CreateBladeContainerResponseAction,
  CreateBladeContainerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CreateBladeContainerParams, BladeContainerDetails } from '../models'

export default (
  params: CreateBladeContainerParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | CreateBladeContainerRequestAction
        | CreateBladeContainerResponseAction
        | CreateBladeContainerErrorAction,
    ) => void,
  ) => {
    const request = new CreateBladeContainerRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<BladeContainerDetails>('/inventory/blade-container/create', params)
      .then((response) => {
        dispatch(new CreateBladeContainerResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateBladeContainerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

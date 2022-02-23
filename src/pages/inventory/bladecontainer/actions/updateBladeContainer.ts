import {
  UpdateBladeContainerRequestAction,
  UpdateBladeContainerResponseAction,
  UpdateBladeContainerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { UpdateBladeContainerParams } from '../models'
import { BladeContainerDetails } from '../models'

export default (
  params: UpdateBladeContainerParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdateBladeContainerRequestAction
        | UpdateBladeContainerResponseAction
        | UpdateBladeContainerErrorAction,
    ) => void,
  ) => {
    const request = new UpdateBladeContainerRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<BladeContainerDetails>(`/inventory/blade-container/update`, params)
      .then((response) => {
        dispatch(new UpdateBladeContainerResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateBladeContainerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

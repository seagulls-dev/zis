import {
  UpdatePhysicalServerRequestAction,
  UpdatePhysicalServerResponseAction,
  UpdatePhysicalServerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { UpdatePhysicalServerParams } from '../models'
import { PhysicalServerDetails } from '../models'

export default (
  params: UpdatePhysicalServerParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdatePhysicalServerRequestAction
        | UpdatePhysicalServerResponseAction
        | UpdatePhysicalServerErrorAction,
    ) => void,
  ) => {
    const request = new UpdatePhysicalServerRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<PhysicalServerDetails>(`/inventory/physical-server/update`, params)
      .then((response) => {
        dispatch(new UpdatePhysicalServerResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdatePhysicalServerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

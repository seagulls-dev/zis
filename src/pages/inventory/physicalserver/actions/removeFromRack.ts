import {
  RemovePhysicalServerFromRackRequestAction,
  RemovePhysicalServerFromRackResponseAction,
  RemovePhysicalServerFromRackErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import {
  PhysicalServerDetails,
  PhysicalServerRemoveFromRackParams,
} from '../models'

export default (
  params: PhysicalServerRemoveFromRackParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | RemovePhysicalServerFromRackRequestAction
        | RemovePhysicalServerFromRackResponseAction
        | RemovePhysicalServerFromRackErrorAction,
    ) => void,
  ) => {
    const request = new RemovePhysicalServerFromRackRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<PhysicalServerDetails>(
        `/inventory/physical-server/remove-from-rack`,
        params,
      )
      .then((response) => {
        dispatch(
          new RemovePhysicalServerFromRackResponseAction(
            request,
            response.data,
          ),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new RemovePhysicalServerFromRackErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

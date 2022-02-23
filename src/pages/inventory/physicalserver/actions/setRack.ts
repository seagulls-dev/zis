import {
  SetPhysicalServerRackRequestAction,
  SetPhysicalServerRackRackResponseAction,
  SetPhysicalServerRackRackErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { PhysicalServerDetails, PhysicalServerSetRackParams } from '../models'

export default (
  params: PhysicalServerSetRackParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | SetPhysicalServerRackRequestAction
        | SetPhysicalServerRackRackResponseAction
        | SetPhysicalServerRackRackErrorAction,
    ) => void,
  ) => {
    const request = new SetPhysicalServerRackRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<PhysicalServerDetails>(`/inventory/physical-server/set-rack`, params)
      .then((response) => {
        dispatch(
          new SetPhysicalServerRackRackResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new SetPhysicalServerRackRackErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

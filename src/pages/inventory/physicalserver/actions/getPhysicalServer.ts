import {
  GetPhysicalServerRequestAction,
  GetPhysicalServerResponseAction,
  GetPhysicalServerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { PhysicalServerDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetPhysicalServerRequestAction
        | GetPhysicalServerResponseAction
        | GetPhysicalServerErrorAction,
    ) => void,
  ) => {
    const request = new GetPhysicalServerRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<PhysicalServerDetails>(`/inventory/physical-server/get?id=${id}`)
      .then((response) => {
        dispatch(new GetPhysicalServerResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetPhysicalServerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

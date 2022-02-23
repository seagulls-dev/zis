import {
  GetPhysicalServersRequestAction,
  GetPhysicalServersResponseAction,
  GetPhysicalServersErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { PhysicalServerDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetPhysicalServersRequestAction
        | GetPhysicalServersResponseAction
        | GetPhysicalServersErrorAction,
    ) => void,
  ) => {
    const request = new GetPhysicalServersRequestAction()
    dispatch(request)

    protectedApiClient
      .get<PhysicalServerDetails[]>('/inventory/physical-server/get-all')
      .then((response) => {
        dispatch(new GetPhysicalServersResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetPhysicalServersErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

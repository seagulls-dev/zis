import {
  AddComponentToPhysicalServerRequestAction,
  AddComponentToPhysicalServerResponseAction,
  AddComponentToPhysicalServerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import {
  PhysicalServerAddComponentParams,
  PhysicalServerDetails,
} from '../models'

export default (
  params: PhysicalServerAddComponentParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | AddComponentToPhysicalServerRequestAction
        | AddComponentToPhysicalServerResponseAction
        | AddComponentToPhysicalServerErrorAction,
    ) => void,
  ) => {
    const request = new AddComponentToPhysicalServerRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<PhysicalServerDetails>(
        '/inventory/physical-server/add-component',
        params,
      )
      .then((response) => {
        dispatch(
          new AddComponentToPhysicalServerResponseAction(
            request,
            response.data,
          ),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new AddComponentToPhysicalServerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

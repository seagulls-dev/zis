import {
  GetBladeContainerRequestAction,
  GetBladeContainerResponseAction,
  GetBladeContainerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { BladeContainerDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetBladeContainerRequestAction
        | GetBladeContainerResponseAction
        | GetBladeContainerErrorAction,
    ) => void,
  ) => {
    const request = new GetBladeContainerRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<BladeContainerDetails>(`/inventory/blade-container/get?id=${id}`)
      .then((response) => {
        dispatch(new GetBladeContainerResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetBladeContainerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

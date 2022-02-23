import {
  MoveBladeInBladeContainerRequestAction,
  MoveBladeInBladeContainerResponseAction,
  MoveBladeInBladeContainerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { MoveBladeParams, BladeContainerDetails } from '../models'

export default (params: MoveBladeParams, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | MoveBladeInBladeContainerRequestAction
        | MoveBladeInBladeContainerResponseAction
        | MoveBladeInBladeContainerErrorAction,
    ) => void,
  ) => {
    const request = new MoveBladeInBladeContainerRequestAction(params)
    dispatch(request)
    protectedApiClient
      .put<BladeContainerDetails>(
        '/inventory/blade-container/move-blade',
        params,
      )
      .then((response) => {
        dispatch(
          new MoveBladeInBladeContainerResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new MoveBladeInBladeContainerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

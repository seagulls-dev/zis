import {
  ReallocateBladeInBladeContainerRequestAction,
  ReallocateBladeInBladeContainerResponseAction,
  ReallocateBladeInBladeContainerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { ReallocateBladeParams, BladeContainerDetails } from '../models'

export default (
  params: ReallocateBladeParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | ReallocateBladeInBladeContainerRequestAction
        | ReallocateBladeInBladeContainerResponseAction
        | ReallocateBladeInBladeContainerErrorAction,
    ) => void,
  ) => {
    const request = new ReallocateBladeInBladeContainerRequestAction(params)
    dispatch(request)
    protectedApiClient
      .put<BladeContainerDetails>(
        '/inventory/blade-container/remove-blade',
        params,
      )
      .then((response) => {
        dispatch(
          new ReallocateBladeInBladeContainerResponseAction(
            request,
            response.data,
          ),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new ReallocateBladeInBladeContainerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  InsertBladeToBladeContainerRequestAction,
  InsertBladeToBladeContainerResponseAction,
  InsertBladeToBladeContainerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { InsertBladeParams, BladeContainerDetails } from '../models'

export default (
  params: InsertBladeParams,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | InsertBladeToBladeContainerRequestAction
        | InsertBladeToBladeContainerResponseAction
        | InsertBladeToBladeContainerErrorAction,
    ) => void,
  ) => {
    const request = new InsertBladeToBladeContainerRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<BladeContainerDetails>(
        '/inventory/blade-container/insert-blade',
        params,
      )
      .then((response) => {
        dispatch(
          new InsertBladeToBladeContainerResponseAction(request, response.data),
        )
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new InsertBladeToBladeContainerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

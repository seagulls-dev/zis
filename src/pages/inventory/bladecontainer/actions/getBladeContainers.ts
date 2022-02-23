import {
  GetBladeContainersRequestAction,
  GetBladeContainersResponseAction,
  GetBladeContainersErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { BladeContainerDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetBladeContainersRequestAction
        | GetBladeContainersResponseAction
        | GetBladeContainersErrorAction,
    ) => void,
  ) => {
    const request = new GetBladeContainersRequestAction()
    dispatch(request)

    protectedApiClient
      .get<BladeContainerDetails[]>('/inventory/blade-container/get-all')
      .then((response) => {
        dispatch(new GetBladeContainersResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetBladeContainersErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

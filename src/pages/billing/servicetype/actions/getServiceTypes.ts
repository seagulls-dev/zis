import {GetServiceTypesRequestAction, GetServiceTypesResponseAction, GetServiceTypesErrorAction} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import {ServiceTypeDetails} from '../model'

export default (cb?: (isSuccess: boolean) => void) => {
  return (dispatch: (args: GetServiceTypesRequestAction | GetServiceTypesResponseAction | GetServiceTypesErrorAction) => void) => {
    const request = new GetServiceTypesRequestAction()
    dispatch(request)
    protectedApiClient.get<ServiceTypeDetails[]>('/billing/service-type/get-all')
      .then(response => {
        dispatch(new GetServiceTypesResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch(error => {
        dispatch(new GetServiceTypesErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

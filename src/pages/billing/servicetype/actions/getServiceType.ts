import {GetServiceTypeRequestAction, GetServiceTypeResponseAction, GetServiceTypeErrorAction} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import {ServiceTypeDetails} from '../model'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (dispatch: (args: GetServiceTypeRequestAction | GetServiceTypeResponseAction | GetServiceTypeErrorAction) => void) => {
    const request = new GetServiceTypeRequestAction(id)
    dispatch(request)
    protectedApiClient.get<ServiceTypeDetails>(`/billing/service-type/get?id=${id}`)
      .then(response => {
        dispatch(new GetServiceTypeResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch(error => {
        dispatch(new GetServiceTypeErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

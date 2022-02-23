import {UpdateServiceTypeRequestAction, UpdateServiceTypeResponseAction, UpdateServiceTypeErrorAction} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import {ServiceTypeDetails} from '../model'

export default (params: ServiceTypeDetails, cb?: (isSuccess: boolean) => void) => {
  return (dispatch: (args: UpdateServiceTypeRequestAction | UpdateServiceTypeResponseAction | UpdateServiceTypeErrorAction) => void) => {
    const request = new UpdateServiceTypeRequestAction(params)
    dispatch(request)
    protectedApiClient.put<ServiceTypeDetails>(`/billing/service-type/update`, params)
      .then(response => {
        dispatch(new UpdateServiceTypeResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch(error => {
        dispatch(new UpdateServiceTypeErrorAction(request,error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

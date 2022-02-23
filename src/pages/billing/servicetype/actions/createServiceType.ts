import {CreateServiceTypeRequestAction,CreateServiceTypeResponseAction, CreateServiceTypeErrorAction} from './'
import {protectedApiClient} from 'helpers/api'
import {handleApiErrorWithNotification} from 'helpers/errorHandling'
import {CreateServiceTypeParams, ServiceTypeDetails} from '../model'

export default (params: CreateServiceTypeParams, cb?: (isSuccess: boolean) => void) => {
  return (dispatch: (arg: CreateServiceTypeRequestAction | CreateServiceTypeResponseAction | CreateServiceTypeErrorAction) => void) => {
    const request = new CreateServiceTypeRequestAction(params)
    dispatch(request)
    protectedApiClient.post<ServiceTypeDetails>('/billing/service-type/create', params)
      .then(response => {
        dispatch(new CreateServiceTypeResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch(error => {
        dispatch(new CreateServiceTypeErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}


import {DeleteServiceTypeRequestAction, DeleteServiceTypeResponseAction, DeleteServiceTypeErrorAction} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (dispatch: (args: DeleteServiceTypeRequestAction | DeleteServiceTypeResponseAction | DeleteServiceTypeErrorAction) => void) => {
    const request = new DeleteServiceTypeRequestAction(id)
    dispatch(request)
    protectedApiClient.delete(`/billing/service-type/delete?id=${id}`)
      .then(response => {
        dispatch(new DeleteServiceTypeResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch(error => {
        dispatch(new DeleteServiceTypeErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

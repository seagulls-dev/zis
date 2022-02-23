import {
  GetCustomerSelfRequestAction,
  GetCustomerSelfResponseAction,
  GetCustomerSelfErrorAction
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CustomerDetails } from '../models'

export default (expand?: string, cb?: (isSuccess: boolean) => void) => {
  return (dispatch: (args: GetCustomerSelfRequestAction | GetCustomerSelfResponseAction | GetCustomerSelfErrorAction) => void) => {
    const request = new GetCustomerSelfRequestAction()
    dispatch(request)

    protectedApiClient.get<CustomerDetails>(
      `/customer/get-self${expand ? '?expand=' + expand : ''}`
    )
      .then(response => {
        dispatch(new GetCustomerSelfResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch(error => {
        dispatch(new GetCustomerSelfErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })

  }
}

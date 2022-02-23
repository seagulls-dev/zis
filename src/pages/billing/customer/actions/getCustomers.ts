import {
  GetCustomersRequestAction,
  GetCustomersResponseAction,
  GetCustomersErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CustomerDetails } from '../models'

export default (expand?: string, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetCustomersRequestAction
        | GetCustomersResponseAction
        | GetCustomersErrorAction,
    ) => void,
  ) => {
    const request = new GetCustomersRequestAction()
    dispatch(request)

    protectedApiClient
      .get<CustomerDetails[]>(
        `/customer/get-all${expand ? '?expand=' + expand : ''}`,
      )
      .then((response) => {
        dispatch(new GetCustomersResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetCustomersErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

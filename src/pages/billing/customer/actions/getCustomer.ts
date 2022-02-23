import {
  GetCustomerRequestAction,
  GetCustomerResponseAction,
  GetCustomerErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { CustomerDetails } from '../models'

export default (
  id: number,
  expand?: string,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | GetCustomerRequestAction
        | GetCustomerResponseAction
        | GetCustomerErrorAction,
    ) => void,
  ) => {
    const request = new GetCustomerRequestAction()
    dispatch(request)

    protectedApiClient
      .get<CustomerDetails>(
        `/customer/get?id=${id}${expand ? '&expand=' + expand : ''}`,
      )
      .then((response) => {
        dispatch(new GetCustomerResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetCustomerErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

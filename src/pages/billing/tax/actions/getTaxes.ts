import {
  GetTaxesRequestAction,
  GetTaxesResponseAction,
  GetTaxesErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { TaxDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg: GetTaxesRequestAction | GetTaxesResponseAction | GetTaxesErrorAction,
    ) => void,
  ) => {
    const request = new GetTaxesRequestAction()
    dispatch(request)

    protectedApiClient
      .get<TaxDetails[]>('/billing/tax/get-all')
      .then((response) => {
        dispatch(new GetTaxesResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetTaxesErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

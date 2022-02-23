import {
  UpdateTaxRequestAction,
  UpdateTaxResponseAction,
  UpdateTaxErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { TaxDetails } from '../models'

export default (params: TaxDetails, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | UpdateTaxRequestAction
        | UpdateTaxResponseAction
        | UpdateTaxErrorAction,
    ) => void,
  ) => {
    const request = new UpdateTaxRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<TaxDetails>(`/billing/tax/update`, params)
      .then((response) => {
        dispatch(new UpdateTaxResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateTaxErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

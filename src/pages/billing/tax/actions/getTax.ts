import { GetTaxRequestAction, GetTaxResponseAction, GetTaxErrorAction } from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { TaxDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg: GetTaxRequestAction | GetTaxResponseAction | GetTaxErrorAction,
    ) => void,
  ) => {
    const request = new GetTaxRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<TaxDetails>(`/billing/tax/get?id=${id}`)
      .then((response) => {
        dispatch(new GetTaxResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetTaxErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  DeleteTaxRequestAction,
  DeleteTaxResponseAction,
  DeleteTaxErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteTaxRequestAction
        | DeleteTaxResponseAction
        | DeleteTaxErrorAction,
    ) => void,
  ) => {
    const request = new DeleteTaxRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/billing/tax/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeleteTaxResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteTaxErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

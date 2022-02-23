import {
  DeletePricelistRequestAction,
  DeletePricelistResponseAction,
  DeletePricelistErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeletePricelistRequestAction
        | DeletePricelistResponseAction
        | DeletePricelistErrorAction,
    ) => void,
  ) => {
    const request = new DeletePricelistRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/billing/pricelist/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeletePricelistResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeletePricelistErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

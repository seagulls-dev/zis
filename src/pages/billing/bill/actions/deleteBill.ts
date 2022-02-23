import {
  DeleteBillRequestAction,
  DeleteBillResponseAction,
  DeleteBillErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteBillRequestAction
        | DeleteBillResponseAction
        | DeleteBillErrorAction,
    ) => void,
  ) => {
    const request = new DeleteBillRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/billing/bill/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeleteBillResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteBillErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

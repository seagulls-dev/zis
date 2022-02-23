import {
  DeleteCompanyRequestAction,
  DeleteCompanyResponseAction,
  DeleteCompanyErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteCompanyRequestAction
        | DeleteCompanyResponseAction
        | DeleteCompanyErrorAction,
    ) => void,
  ) => {
    const request = new DeleteCompanyRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/company/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeleteCompanyResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteCompanyErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

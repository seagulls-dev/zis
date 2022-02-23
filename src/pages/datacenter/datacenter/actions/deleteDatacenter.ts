import {
  DeleteDataCenterRequestAction,
  DeleteDataCenterResponseAction,
  DeleteDataCenterErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | DeleteDataCenterRequestAction
        | DeleteDataCenterResponseAction
        | DeleteDataCenterErrorAction,
    ) => void,
  ) => {
    const request = new DeleteDataCenterRequestAction(id)
    dispatch(request)

    protectedApiClient
      .delete(`/datacenter/datacenter/delete?id=${id}`)
      .then((response) => {
        dispatch(new DeleteDataCenterResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new DeleteDataCenterErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

import {
  GetBlockRequestAction,
  GetBlockResponseAction,
  GetBlockErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { BlockDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg: GetBlockRequestAction | GetBlockResponseAction | GetBlockErrorAction,
    ) => void,
  ) => {
    const request = new GetBlockRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<BlockDetails>(`/datacenter/block/get?id=${id}`)
      .then((response) => {
        dispatch(new GetBlockResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetBlockErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

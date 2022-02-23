import {
  GetBlocksRequestAction,
  GetBlocksResponseAction,
  GetBlocksErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { BlockDetails } from '../models'

export default (cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetBlocksRequestAction
        | GetBlocksResponseAction
        | GetBlocksErrorAction,
    ) => void,
  ) => {
    const request = new GetBlocksRequestAction()
    dispatch(request)

    protectedApiClient
      .get<BlockDetails[]>('/datacenter/block/get-all')
      .then((response) => {
        dispatch(new GetBlocksResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetBlocksErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

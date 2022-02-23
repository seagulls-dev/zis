import {
  CreateBlockRequestAction,
  CreateBlockResponseAction,
  CreateBlockErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { BlockDetails, BlockParams } from '../models'

export default (params: BlockParams, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | CreateBlockRequestAction
        | CreateBlockResponseAction
        | CreateBlockErrorAction,
    ) => void,
  ) => {
    const request = new CreateBlockRequestAction(params)
    dispatch(request)
    protectedApiClient
      .post<BlockDetails>('/datacenter/block/create', params)
      .then((response) => {
        dispatch(new CreateBlockResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new CreateBlockErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

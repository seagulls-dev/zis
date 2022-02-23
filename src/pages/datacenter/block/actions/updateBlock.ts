import {
  UpdateBlockRequestAction,
  UpdateBlockResponseAction,
  UpdateBlockErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { BlockDetails } from '../models'

export default (params: BlockDetails, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | UpdateBlockRequestAction
        | UpdateBlockResponseAction
        | UpdateBlockErrorAction,
    ) => void,
  ) => {
    const request = new UpdateBlockRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<BlockDetails>(`/datacenter/block/update`, params)
      .then((response) => {
        dispatch(new UpdateBlockResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdateBlockErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

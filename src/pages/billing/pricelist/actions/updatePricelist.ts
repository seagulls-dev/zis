import {
  UpdatePricelistRequestAction,
  UpdatePricelistResponseAction,
  UpdatePricelistErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { PricelistDetails } from '../models'

export default (
  params: PricelistDetails,
  cb?: (isSuccess: boolean) => void,
) => {
  return (
    dispatch: (
      arg:
        | UpdatePricelistRequestAction
        | UpdatePricelistResponseAction
        | UpdatePricelistErrorAction,
    ) => void,
  ) => {
    const request = new UpdatePricelistRequestAction(params)
    dispatch(request)

    protectedApiClient
      .put<PricelistDetails>(`/billing/pricelist/update`, params)
      .then((response) => {
        dispatch(new UpdatePricelistResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new UpdatePricelistErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}

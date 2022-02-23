import {
  GetPricelistRequestAction,
  GetPricelistResponseAction,
  GetPricelistErrorAction,
} from '.'
import { protectedApiClient } from 'helpers/api'
import { handleApiErrorWithNotification } from 'helpers/errorHandling'
import { PricelistDetails } from '../models'

export default (id: number, cb?: (isSuccess: boolean) => void) => {
  return (
    dispatch: (
      arg:
        | GetPricelistRequestAction
        | GetPricelistResponseAction
        | GetPricelistErrorAction,
    ) => void,
  ) => {
    const request = new GetPricelistRequestAction(id)
    dispatch(request)

    protectedApiClient
      .get<PricelistDetails>(`/billing/pricelist/get?id=${id}`)
      .then((response) => {
        dispatch(new GetPricelistResponseAction(request, response.data))
        cb && cb(true)
      })
      .catch((error) => {
        dispatch(new GetPricelistErrorAction(request, error))
        handleApiErrorWithNotification(error)
        cb && cb(false)
      })
  }
}
